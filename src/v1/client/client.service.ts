import { Injectable } from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import CreateClient from 'domain/useCases/client/CreateClient/CreateClient';
import { Sequelize } from 'sequelize-typescript';
import ClientRepositoryInSequelize from 'src/adapters/repository/client/ClientRepositoryInSequelize';
import { CreateClientBody } from './dto/client.dto';
import FindByEmailUser from 'domain/useCases/client/FindByEmailUser/FindByEmailUser';
import FindByIdUser from 'domain/useCases/client/FindByIdUser/FindByIdUser';

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

  findByEmailUser(email: string): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FindByEmailUser(clientRepositoryInSequelize);

    return useCase.execute(email);
  }

  findByIdUser(id: number): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FindByIdUser(clientRepositoryInSequelize);

    return useCase.execute(id);
  }
}
