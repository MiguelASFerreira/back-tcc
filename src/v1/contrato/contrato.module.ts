import { Module } from '@nestjs/common';
import { ContratoController } from './contrato.controller';
import { ContratoService } from './contrato.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ContratoController],
  providers: [ContratoService]
})
export class ContratoModule {}
