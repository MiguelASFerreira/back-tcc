import { Module } from '@nestjs/common';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EmpresaController],
  providers: [EmpresaService],
})
export class EmpresaModule {}
