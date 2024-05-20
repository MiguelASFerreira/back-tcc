import { Module } from '@nestjs/common';
import { ServicoController } from './servico.controller';
import { ServicoService } from './servico.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ServicoController],
  providers: [ServicoService]
})
export class ServicoModule {}
