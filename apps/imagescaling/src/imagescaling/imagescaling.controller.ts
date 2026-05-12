import { Controller } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('imagescaling')
export class ImagescalingController {
  constructor(private readonly imagescalingService: ImagescalingService) {}

  @MessagePattern('image_uploaded')
  scaleImage(@Payload() body: any) {
    console.log('Received message:', body);
  }
}
