import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { mailDTO } from './dto/notificationDTO';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(body: mailDTO) {
    await this.mailerService.sendMail({
      to: body.to,
      subject: body.subject,
      html: `${body.html}`,
      attachments: [
        {
          filename: 'Imagem Processada.jpeg',
          content: body.buffer,
        },
      ],
    });
  }
}
