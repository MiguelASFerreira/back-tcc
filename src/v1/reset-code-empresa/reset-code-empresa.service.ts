import { Inject, Injectable } from '@nestjs/common';
import CreateCodeEmpresa from 'domain/useCases/resetCodeEmpresa/CreateCodeEmpresa/CreateCodeEmpresa';
import ExistsCodeEmpresa from 'domain/useCases/resetCodeEmpresa/ExistsCodeEmpresa/ExistsCodeEmpresa';
import { Sequelize } from 'sequelize-typescript';
import { ResetCodeEmpresaRepositoryInSequelize } from 'src/adapters/repository/resetCodeEmpresa/ResetCodeEmpresaRepositoryInSequelize';

@Injectable()
export class ResetCodeEmpresaService {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    createResetCode(id_empresa: number, code: number): Promise<any> {
        const resetCodeUserRepositoryInSequelize = new ResetCodeEmpresaRepositoryInSequelize(
          this.sequelize,
        );
    
        const useCase = new CreateCodeEmpresa(resetCodeUserRepositoryInSequelize);
    
        return useCase.execute(id_empresa, code);
      }
    
      existsCode(code: number): Promise<boolean> {
        const resetCodeUserRepositoryInSequelize = new ResetCodeEmpresaRepositoryInSequelize(
          this.sequelize,
        );
    
        const useCase = new ExistsCodeEmpresa(resetCodeUserRepositoryInSequelize)
    
        return useCase.execute(code)
      }
    
      generateCode() {
        const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    
        return code;
      }
}
