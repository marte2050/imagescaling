import { Module } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { ImagescalingController } from './imagescaling.controller';

@Module({
  controllers: [ImagescalingController],
  providers: [ImagescalingService],
})
export class ImagescalingModule {}
