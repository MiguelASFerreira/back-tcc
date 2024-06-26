import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateEmpresaBody } from './dto/empresa.dto';
import Empresa, { EmpresaInfo } from 'domain/entity/empresa/Empresa';
import EmpresaRepositroyInSequelize from 'src/adapters/repository/empresa/EmpresaRepositoryInSequelize';
import CreateEmpresa from 'domain/useCases/empresa/CreateEmpresa/CreateEmpresa';
import FindByIdEmpresa from 'domain/useCases/empresa/FindByIdEmpresa/FindByIdEmpresa';
import FindByEmailEmpresa from 'domain/useCases/empresa/FindByEmailEmpresa/FindByEmailEmpresa';
import UpdateEmpresa from 'domain/useCases/empresa/UpdateEmpresa/UpdateEmpresa';
import FindContratoEmpresa from 'domain/useCases/empresa/FindContratoEmpresa/FindContratoEmpresa';
import FinalContrato from 'domain/useCases/empresa/FinalContrato/FinalContrato';
import AddImageEmpresa from 'domain/useCases/empresa/AddImageEmpresa/AddImageEmpresa';
import { ResetCodeEmpresaRepositoryInSequelize } from 'src/adapters/repository/resetCodeEmpresa/ResetCodeEmpresaRepositoryInSequelize';
import CompareCodeEmpresa from 'domain/useCases/resetCodeEmpresa/CompareCodeEmpresa/CompareCodeEmpresa';
import EsqueciSenhaEmpresa from 'domain/useCases/empresa/EsqueciSenha/EsqueciSenha';

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

  findByIdEmpresa(id: number): Promise<EmpresaInfo> {
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

  findContratoEmpresa(id_empresa: number, id_servico?: number): Promise<any> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new FindContratoEmpresa(empresaRepositoryInSequelize)

    return useCase.execute(id_empresa, id_servico);
  }

  finalContrato(id_empresa: number, id_client: number) {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new FinalContrato(empresaRepositoryInSequelize)

    return useCase.execute(id_client, id_empresa)
  }

  esqueciSenha(id_client: number, senha: string): Promise<any> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new EsqueciSenhaEmpresa(empresaRepositoryInSequelize)

    return useCase.execute(id_client, senha)
  }

  compareCode(id_empresa: number): Promise<any> {
    const resetCodeEmpresaRepositoryInSequelize = new ResetCodeEmpresaRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new CompareCodeEmpresa(resetCodeEmpresaRepositoryInSequelize)

    return useCase.execute(id_empresa);
  }

  addImageEmpresa(id: number, path: string): Promise<any> {
    const empresaRepositoryInSequelize = new EmpresaRepositroyInSequelize(
      this.sequelize,
    );

    const useCase = new AddImageEmpresa(empresaRepositoryInSequelize)

    return useCase.execute(id, path)
  }
}
