import { Module } from '@nestjs/common';
import { ImagescalingModule } from '../imagescaling/imagescaling.module';

@Module({
  imports: [ImagescalingModule],
})
export class AppModule {}
