import { Injectable } from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import CreateClient from 'domain/useCases/client/CreateClient/CreateClient';
import { Sequelize } from 'sequelize-typescript';
import ClientRepositoryInSequelize from 'src/adapters/repository/client/ClientRepositoryInSequelize';
import { CreateClientBody } from './dto/client.dto';
import FindByEmailUser from 'domain/useCases/client/FindByEmailUser/FindByEmailUser';
import FindByIdUser from 'domain/useCases/client/FindByIdUser/FindByIdUser';
import UpdateClient from 'domain/useCases/client/UpdateClient/UpdateClient';
import UpdateImageClient from 'domain/useCases/client/UpdateImageClient/UpdateImageClient';

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

  updateClient(id: number, data: Client): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new UpdateClient(clientRepositoryInSequelize);

    return useCase.execute(id, data);
  }

  updateImageClient(file: Express.Multer.File, id: number): Promise<any> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new UpdateImageClient(clientRepositoryInSequelize);

    return useCase.execute(file, id);
  }
}
