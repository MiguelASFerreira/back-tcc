import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './v1/client/client.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './v1/auth/auth.module';
import { EmpresaModule } from './v1/empresa/empresa.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    }),
    ClientModule,
    AuthModule,
    EmpresaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
