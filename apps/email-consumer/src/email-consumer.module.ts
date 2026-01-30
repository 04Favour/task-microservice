import { Module } from '@nestjs/common';
import { EmailConsumerController } from './email-consumer.controller';
import { EmailConsumerService } from './email-consumer.service';

@Module({
  imports: [],
  controllers: [EmailConsumerController],
  providers: [EmailConsumerService],
})
export class EmailConsumerModule {}
