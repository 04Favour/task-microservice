import { NestFactory } from '@nestjs/core';
import { EmailConsumerModule } from './email-consumer.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EmailConsumerModule, {
      transport: Transport.TCP
    }
  )
  await app.listen();
}
bootstrap();
