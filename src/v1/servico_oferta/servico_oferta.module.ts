import { Module } from '@nestjs/common';
import { ServicoOfertaController } from './servico_oferta.controller';
import { ServicoOfertaService } from './servico_oferta.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicoOfertaController],
  providers: [ServicoOfertaService]
})
export class ServicoOfertaModule {}
