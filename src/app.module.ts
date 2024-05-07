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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      models: [Client, Empresa, Servico, ServicoOferta, Contrato],
      autoLoadModels: true,
    }),
    ClientModule,
    AuthModule,
    EmpresaModule,
    ServicoModule,
    ServicoOfertaModule,
    ContratoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
