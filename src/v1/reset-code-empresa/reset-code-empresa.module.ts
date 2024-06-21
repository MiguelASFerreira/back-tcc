import { Module } from '@nestjs/common';
import { ResetCodeEmpresaController } from './reset-code-empresa.controller';
import { ResetCodeEmpresaService } from './reset-code-empresa.service';
import { EmpresaService } from '../empresa/empresa.service';
import { DatabaseModule } from 'src/database/database.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ResetCodeEmpresaController],
  providers: [ResetCodeEmpresaService, EmpresaService, MailService]
})
export class ResetCodeEmpresaModule {}
