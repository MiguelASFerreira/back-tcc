import { Module } from '@nestjs/common';
import { ResetCodeUserController } from './reset-code-user.controller';
import { ResetCodeUserService } from './reset-code-user.service';
import { ClientService } from '../client/client.service';
import { DatabaseModule } from 'src/database/database.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ResetCodeUserController],
  providers: [ResetCodeUserService, ClientService, MailService]
})
export class ResetCodeUserModule {}
