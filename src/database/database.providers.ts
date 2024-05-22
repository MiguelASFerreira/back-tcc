import { Sequelize } from 'sequelize-typescript';
import { Client } from 'src/model/client/client.model';
import { Contrato } from 'src/model/contrato/contrato.model';
import { Empresa } from 'src/model/empresa/empresa.model';
import { ResetCode } from 'src/model/resetCode/resetCode.model';
import { Servico } from 'src/model/servico/servico.model';
import { ServicoOferta } from 'src/model/servicoOferta/servicoOferta.model';
import { Veiculo } from 'src/model/veiculo/veiculo.model';

export const databaseProviders = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      timezone: '-03:00',
    });
    sequelize.addModels([
      Client,
      Empresa,
      Servico,
      ServicoOferta,
      Contrato,
      ResetCode,
      Veiculo
    ]);
    await sequelize.sync();
    return sequelize;
  },
};
