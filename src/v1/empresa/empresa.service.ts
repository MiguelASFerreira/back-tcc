import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateEmpresaBody } from './dto/empresa.dto';
import Empresa from 'domain/entity/empresa/Empresa';
import EmpresaRepositroyInSequelize from 'src/adapters/repository/empresa/EmpresaRepositoryInSequelize';
import CreateEmpresa from 'domain/useCases/empresa/CreateEmpresa/CreateEmpresa';
import FindByIdEmpresa from 'domain/useCases/empresa/FindByIdEmpresa/FindByIdEmpresa';
import FindByEmailEmpresa from 'domain/useCases/empresa/FindByEmailEmpresa/FindByEmailEmpresa';
import UpdateEmpresa from 'domain/useCases/empresa/UpdateEmpresa/UpdateEmpresa';

@Injectable()
export class EmpresaService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  createEmpresa(data: CreateEmpresaBody): Promise<Empresa> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new CreateEmpresa(empresaRepositoryInSequelize);

    return useCase.execute(data);
  }

  findByIdEmpresa(id: number): Promise<Empresa> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new FindByIdEmpresa(empresaRepositoryInSequelize);

    return useCase.execute(id);
  }

  findByEmailEmpresa(email: string): Promise<Empresa> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new FindByEmailEmpresa(empresaRepositoryInSequelize);

    return useCase.execute(email);
  }

  updateEmpresa(id: number, data: Empresa): Promise<Empresa> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new UpdateEmpresa(empresaRepositoryInSequelize);

    return useCase.execute(id, data);
  }
}
