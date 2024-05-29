import { Module } from '@nestjs/common';
import { ResetCodeController } from './reset-code.controller';
import { ResetCodeService } from './reset-code.service';
import { ClientService } from '../client/client.service';
import { DatabaseModule } from 'src/database/database.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ResetCodeController],
  providers: [ResetCodeService, ClientService, MailService]
})
export class ResetCodeModule {}
