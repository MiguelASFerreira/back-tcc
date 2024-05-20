import { Inject, Injectable } from '@nestjs/common';
import Client from 'domain/entity/client/Client';
import Empresa from 'domain/entity/empresa/Empresa';
import FindByEmailUser from 'domain/useCases/client/FindByEmailUser/FindByEmailUser';
import FindByEmailEmpresa from 'domain/useCases/empresa/FindByEmailEmpresa/FindByEmailEmpresa';
import { Sequelize } from 'sequelize-typescript';
import ClientRepositoryInSequelize from 'src/adapters/repository/client/ClientRepositoryInSequelize';
import EmpresaRepositroyInSequelize from 'src/adapters/repository/empresa/EmpresaRepositoryInSequelize';

@Injectable()
export class AuthService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  findByEmailUser(email: string): Promise<Client> {
    const clientRepositoryInSequelize = new ClientRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FindByEmailUser(clientRepositoryInSequelize);

    return useCase.execute(email);
  }

  findByEmailEmpresa(email: string): Promise<Empresa> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new FindByEmailEmpresa(empresaRepositoryInSequelize);

    return useCase.execute(email);
  }
}
