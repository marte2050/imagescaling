import { Module } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { ImagescalingController } from './imagescaling.controller';
import { S3Module } from 'src/s3/s3.module';
import { KafkaModule } from 'src/kafka/kafka.module';
import { ConfigModule } from '@nestjs/config';
import { KafkaService } from 'src/kafka/kafka.service';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [ConfigModule, S3Module, KafkaModule],
  controllers: [ImagescalingController],
  providers: [ImagescalingService, KafkaService, S3Service],
})
export class ImagescalingModule {}
