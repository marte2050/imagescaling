import { Inject, Injectable } from '@nestjs/common';
import { KAFKA_SERVICE } from './kafka.module';
import { ClientKafka } from '@nestjs/microservices';
import { uploadDTO } from 'src/upload/dto/uploadDTO';

@Injectable()
export class KafkaService {
  constructor(@Inject(KAFKA_SERVICE) private readonly kafkaClient: ClientKafka) {}

  publishToKafka(information: uploadDTO, key: string) {
    this.kafkaClient.emit('image_uploaded', {
      url: key,
      ...information,
    });
  }
}
