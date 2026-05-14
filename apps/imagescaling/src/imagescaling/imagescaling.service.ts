import { Injectable } from '@nestjs/common';
import { imageDTO } from './dto/imageDTO';
import sharp from 'sharp';
import { S3Service } from 'src/s3/s3.service';
import { KafkaService } from 'src/kafka/kafka.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImagescalingService {
  private readonly bucketName: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
    private readonly kafkaService: KafkaService,
  ) {
    this.bucketName = this.configService.get<string>('BUCKET_NAME') ?? 'imagescaling';
  }

  async imageScaling(body: imageDTO) {
    const buffer = await this.s3Service.getObject(this.bucketName, body.metadata.key);
    const resizedBuffer = await sharp(buffer).resize(body.metadata.width, body.metadata.height).jpeg({ quality: 80 }).toBuffer();
    const key = `${Date.now()}-scaled.jpeg`;
    await this.s3Service.uploadS3(resizedBuffer, key, this.bucketName);
    this.kafkaService.publishToKafka(
      {
        email: body.metadata.email,
        key: body.metadata.key,
      },
      key,
      'notification',
    );

    return {
      message: 'Image scaled and uploaded successfully',
    };
  }
}
