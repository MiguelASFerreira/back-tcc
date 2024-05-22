import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './v1/client/client.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './v1/auth/auth.module';
import { EmpresaModule } from './v1/empresa/empresa.module';
import { ServicoModule } from './v1/servico/servico.module';
import { ServicoOfertaModule } from './v1/servico_oferta/servico_oferta.module';
import { ContratoModule } from './v1/contrato/contrato.module';
import { Client } from './model/client/client.model';
import { Empresa } from './model/empresa/empresa.model';
import { Servico } from './model/servico/servico.model';
import { ServicoOferta } from './model/servicoOferta/servicoOferta.model';
import { Contrato } from './model/contrato/contrato.model';
import { ResetCodeModule } from './v1/reset-code/reset-code.module';
import { ResetCode } from './model/resetCode/resetCode.model';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from './database/database.module';
import { VeiculoModule } from './v1/veiculo/veiculo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    ClientModule,
    AuthModule,
    EmpresaModule,
    ServicoModule,
    ServicoOfertaModule,
    ContratoModule,
    ResetCodeModule,
    VeiculoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
