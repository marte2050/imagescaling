import { Module } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { ImagescalingController } from './imagescaling.controller';
import { S3Module } from 'src/s3/s3.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [S3Module, KafkaModule],
  controllers: [ImagescalingController],
  providers: [ImagescalingService],
})
export class ImagescalingModule {}
