import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from './entity/tasks.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks]), ClientsModule.register([{
    name: 'EMAIL_SERVICE',
    transport: Transport.TCP
  }])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
