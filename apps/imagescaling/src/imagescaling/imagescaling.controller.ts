import { Controller } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { imageDTO } from './dto/imageDTO';

@Controller('imagescaling')
export class ImagescalingController {
  constructor(private readonly imagescalingService: ImagescalingService) {}

  @MessagePattern('image_uploaded')
  scaleImage(@Payload() body: imageDTO) {
    return this.imagescalingService.imageScaling(body);
  }
}
