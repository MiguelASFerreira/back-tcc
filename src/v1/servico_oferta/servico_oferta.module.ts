import { Module } from '@nestjs/common';
import { ServicoOfertaController } from './servico_oferta.controller';
import { ServicoOfertaService } from './servico_oferta.service';

@Module({
  controllers: [ServicoOfertaController],
  providers: [ServicoOfertaService]
})
export class ServicoOfertaModule {}
