import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseConfigService } from '../database/database.config';
import { ClientModule } from './v1/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
      inject: [ConfigService],
    }),
    ClientModule,
    // DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
