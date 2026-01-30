import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}
