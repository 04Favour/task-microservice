import { Controller, Get } from '@nestjs/common';
import { EmailConsumerService } from './email-consumer.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class EmailConsumerController {
  constructor(private readonly emailConsumerService: EmailConsumerService) {}

  @EventPattern(['task_created', 'task_creation_failed'])
  async handleTaskCreated(data){
    console.log(data)
  }
}
