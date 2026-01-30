import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/createTask.dto';
import { UpdateTaskDto } from './dtos/updateTask.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { queryObjects } from 'v8';


@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The task has been successfully created.'})
  @ApiResponse({ status: 409, description: 'Conflict.'})
  createTask(@Body() createTask: CreateTaskDto){
    return this.tasksService.createTask(createTask)
    }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The record has been updated.'})
  @ApiResponse({ status: 404, description: 'Not Found'})
  updateTask(@Param('id') id: string, @Body() update: UpdateTaskDto){
    return this.tasksService.updateTask(id, update)
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Task has been deleted'})
  @ApiResponse({ status: 404, description: 'Not Found.'})
  deleteTask(@Param('id') id: string){
    return this.tasksService.deleteTask(id)
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Task'})
  @ApiResponse({ status: 404, description: 'Not Found.'})
  GetTask(@Query('title') title: string){
    return this.tasksService.findTask(title)
  }

  // @Get()
  // @ApiResponse({ status: 200, description: 'Task[]'})
  // @ApiResponse({ status: 401, description: 'Not Found.'})
  // async AllTasks(@Query('description') description: string){
  //   return await this.tasksService.allTasks(description)
  // }

}
