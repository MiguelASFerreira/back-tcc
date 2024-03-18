import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      database: this.configService.get<string>('DB_DATABASE'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      autoLoadModels: true,
      synchronize: true,
      models: [],
    };
  }
}
