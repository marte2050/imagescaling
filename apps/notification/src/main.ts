import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { kafkaMicroserviceOptions } from './kafka/kafka.module';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, kafkaMicroserviceOptions);
  await app.listen();
}

void bootstrap();
