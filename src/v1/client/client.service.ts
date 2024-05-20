import { Inject, Injectable } from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import CreateClient from 'domain/useCases/client/CreateClient/CreateClient';
import { Sequelize } from 'sequelize-typescript';
import ClientRepositoryInSequelize from 'src/adapters/repository/client/ClientRepositoryInSequelize';
import { CreateClientBody } from './dto/client.dto';
import FindByEmailUser from 'domain/useCases/client/FindByEmailUser/FindByEmailUser';
import FindByIdUser from 'domain/useCases/client/FindByIdUser/FindByIdUser';
import UpdateClient from 'domain/useCases/client/UpdateClient/UpdateClient';
import EsqueciSenha from 'domain/useCases/client/EsqueciSenha/EsqueciSenha';
import CompareCode from 'domain/useCases/resetCode/CompareCode/CompareCode';
import { ResetCodeRepositoryInSequelize } from 'src/adapters/repository/resetCode/ResetCodeRepositoryInSequelize';

@Injectable()
export class ClientService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

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

  esqueciSenha(id_client: number, senha: string): Promise<any> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new EsqueciSenha(clientRepositoryInSequelize)

    return useCase.execute(id_client, senha)
  }

  compareCode(id_client: number): Promise<any> {
    const resetCodeRepositoryInSequelize = new ResetCodeRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new CompareCode(resetCodeRepositoryInSequelize)

    return useCase.execute(id_client);
  }
}
