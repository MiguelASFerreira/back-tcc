import { Module } from '@nestjs/common';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { DatabaseModule } from 'src/database/database.module';
import { EmpresaService } from '../empresa/empresa.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContratoController],
  providers: [ContratoService, EmpresaService]
})
export class ContratoModule {}
