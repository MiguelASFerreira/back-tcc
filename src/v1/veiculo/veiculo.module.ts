import { Module } from '@nestjs/common';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { DatabaseModule } from 'src/database/database.module';
import { EmpresaService } from '../empresa/empresa.service';

@Module({
  imports: [DatabaseModule],
  providers: [VeiculoService, EmpresaService],
  controllers: [VeiculoController]
})
export class VeiculoModule {}
