import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer'
import { MailtrapClient } from "mailtrap"
import { SendEmailResetPasswordMailTrapDTO, SendEmailResetPasswordNodemailerdDTO } from './interface/mail.interface';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
    private readonly logger: Logger = new Logger();
    nodemailerTransport() {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: +process.env.SMTP_PORT,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });

        return transporter;
    }

    async sendEmailNodemailerTransport(dto: SendEmailResetPasswordNodemailerdDTO) {
        const { from, recipients, subject, html, placeholderReplacements } = dto;

        const transport = this.nodemailerTransport();

        const options: Mail.Options = {
            from: from ?? {
                name: process.env.SMTP_USER,
                address: process.env.SMTP_PASS,
            },
            to: recipients,
            subject: subject,
            html: html,
        }

        try {
            const result = transport.sendMail(options);
            
            return result;
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async sendEmailResetCodeMailTrap(dto: SendEmailResetPasswordMailTrapDTO) {
        const { from, recipients, template_uuid, template_variables} = dto;
        try {
            const client = new MailtrapClient({ token: process.env.SMTP_TOKEN });

            return await client.send({
                from: from,
                to: recipients,
                template_uuid: template_uuid,
                template_variables: template_variables
            })
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
