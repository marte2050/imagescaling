import { Inject, Injectable } from '@nestjs/common';
import { imageDTO } from './dto/imageDTO';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { S3_CLIENT } from 'src/s3/s3.module';
import sharp from 'sharp';

@Injectable()
export class ImagescalingService {
  constructor(@Inject(S3_CLIENT) private readonly s3: S3Client) {}
  async imageScaling(body: imageDTO) {
    const command = new GetObjectCommand({
      Bucket: 'imagescaling',
      Key: body.metadata.url,
    });

    const response = await this.s3.send(command);
    const buffer = await response.Body?.transformToByteArray();

    const resizedBuffer = await sharp(buffer)
      .resize(body.metadata.width, body.metadata.height)
      .jpeg({ quality: 80 })
      .toBuffer();

    try {
      await this.s3.send(
        new PutObjectCommand({
          Bucket: 'imagescaling',
          Key: 'fileName.jpeg',
          Body: resizedBuffer,
          ContentType: 'image/jpeg',
        }),
      );
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    return {
      message: 'Image scaled and uploaded successfully',
    };
  }
}
