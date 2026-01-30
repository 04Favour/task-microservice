import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entity/tasks.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(Tasks) private taskRepo: Repository<Tasks>, @Inject('EMAIL_SERVICE') private client: ClientProxy){}

    async createTask(createTask: CreateTaskDto){
        const task = this.taskRepo.create(createTask)
        try {
            const savedTask = await this.taskRepo.save(task)
            this.client.emit('task_created', savedTask)
            return {
                message: 'Task Created',
                data: savedTask
            }
        } catch(error){
            if (error.code === '23505'){
                this.client.emit('task_creation_failed', {
                    reason: 'Duplicate Task Title',
                    data: createTask
                })
                throw new ConflictException()
            }
            console.log(error)
        }
    }

    async updateTask(id: string, dto: UpdateTaskDto) {
        const exists = await this.taskRepo.exists({where: {id}})
        const updatedTask = await this.taskRepo.findOne({where:{title: dto.title}})
        if (updatedTask) throw new ConflictException();
        if(!exists) throw new NotFoundException();
        const result = await this.taskRepo
            .createQueryBuilder()
            .update()
            .set(dto)
            .where('id=:id', {id})
            .returning('*')
            .execute(); 
        return result.raw[0]
    }


    async deleteTask(id: string){
        const task = await this.taskRepo.delete(id)
        if(task.affected === 0) throw new NotFoundException();
        return {"message": "Deleted"}
    }

    async findTask(title: string){
        const task = await this.taskRepo.findOneBy({title})
        if(!task) throw new NotFoundException();
        return task;
    }

    //This not needs to be modfified later
    // async allTasks(description: string){
    //     return await this.taskRepo.find({where:{description}})
    // }
}
