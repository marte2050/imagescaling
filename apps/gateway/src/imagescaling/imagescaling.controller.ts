import { Controller } from '@nestjs/common';
import { ImagescalingService } from './imagescaling.service';

@Controller('imagescaling')
export class ImagescalingController {
  constructor(private readonly imagescalingService: ImagescalingService) {}
}
