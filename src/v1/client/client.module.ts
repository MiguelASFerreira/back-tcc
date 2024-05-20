import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
