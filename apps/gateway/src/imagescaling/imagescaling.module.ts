import { Module } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { ImagescalingController } from './imagescaling.controller';
import { S3Module } from './s3.module';

@Module({
  imports: [S3Module],
  controllers: [ImagescalingController],
  providers: [ImagescalingService],
})
export class ImagescalingModule {}
