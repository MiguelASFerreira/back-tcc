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
import CompareCodeUser from 'domain/useCases/resetCodeUser/CompareCodeUser/CompareCodeUser';
import { ResetCodeUserRepositoryInSequelize } from 'src/adapters/repository/resetCodeUser/ResetCodeUserRepositoryInSequelize';
import FinalContratoUser from 'domain/useCases/client/FinalContrato/FinalContrato';
import AddImageClient from 'domain/useCases/client/AddImageClient/AddImageClient';

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
    const resetCodeRepositoryInSequelize = new ResetCodeUserRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new CompareCodeUser(resetCodeRepositoryInSequelize)

    return useCase.execute(id_client);
  }

  finalContrato(id_empresa: number, id_client: number): Promise<any> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FinalContratoUser(clientRepositoryInSequelize)

    return useCase.execute(id_empresa, id_client)
  }

  addImageClient(id: number, path: string): Promise<any> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new AddImageClient(clientRepositoryInSequelize);

    return useCase.execute(id, path)
  }
}
