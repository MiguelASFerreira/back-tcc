import { Sequelize } from 'sequelize-typescript';
// import { Client } from 'src/model/client/client.model';

export const databaseProviders = {
  provide: 'SEQUELIZE',
  useFactory: async () => {
    const sequelize = new Sequelize({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
    // sequelize.addModels([Client]);
    // await sequelize.sync();
    return sequelize;
  },
};
