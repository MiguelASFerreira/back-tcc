import { Module } from '@nestjs/common';
import { ServicoOfertaController } from './servico_oferta.controller';
import { ServicoOfertaService } from './servico_oferta.service';
import { DatabaseModule } from 'src/database/database.module';
import { ServicoService } from '../servico/servico.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicoOfertaController],
  providers: [ServicoOfertaService, ServicoService]
})
export class ServicoOfertaModule {}
