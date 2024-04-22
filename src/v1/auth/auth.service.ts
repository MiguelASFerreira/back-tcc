import { Injectable } from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import FindByEmail from 'domain/useCases/client/FindByEmailUser/FindByEmailUser';
import { Sequelize } from 'sequelize-typescript';
import ClientRepositoryInSequelize from 'src/adapters/repository/client/ClientRepositoryInSequelize';

@Injectable()
export class AuthService {
  constructor(private readonly sequelize: Sequelize) {}

  findByEmailUser(email: string): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FindByEmail(clientRepositoryInSequelize);

    return useCase.execute(email);
  }
}
