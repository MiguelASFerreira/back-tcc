import { Injectable } from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import CreateClient from 'domain/useCases/client/CreateClient/CreateClient';
import { Sequelize } from 'sequelize-typescript';
import ClientRepositoryInSequelize from 'src/adapters/repository/client/ClientRepositoryInSequelize';
import { CreateClientBody } from './dto/client.dto';
import FindByEmail from 'domain/useCases/client/FindByEmail/FindByEmail';

@Injectable()
export class ClientService {
  constructor(private readonly sequelize: Sequelize) {}

  createClient(data: CreateClientBody): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );
    const useCase = new CreateClient(clientRepositoryInSequelize);
    return useCase.execute(data);
  }

  findByEmail(email: string): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FindByEmail(clientRepositoryInSequelize);

    return useCase.execute(email);
  }
}
