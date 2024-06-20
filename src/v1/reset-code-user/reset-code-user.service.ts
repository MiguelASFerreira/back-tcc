import { Inject, Injectable } from '@nestjs/common';
import CreateCodeUser from 'domain/useCases/resetCodeUser/CreateCodeUser/CreateCodeUser';
import { Sequelize } from 'sequelize-typescript';
import { ResetCodeUserRepositoryInSequelize } from 'src/adapters/repository/resetCodeUser/ResetCodeUserRepositoryInSequelize';
import ExistsCodeUser from 'domain/useCases/resetCodeUser/ExistsCodeUser/ExistsCodeUser';

@Injectable()
export class ResetCodeUserService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  createResetCode(id_client: number, code: number): Promise<any> {
    const resetCodeUserRepositoryInSequelize = new ResetCodeUserRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new CreateCodeUser(resetCodeUserRepositoryInSequelize);

    return useCase.execute(id_client, code);
  }

  existsCode(code: number): Promise<boolean> {
    const resetCodeUserRepositoryInSequelize = new ResetCodeUserRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new ExistsCodeUser(resetCodeUserRepositoryInSequelize)

    return useCase.execute(code)
  }

  generateCode() {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    return code;
  }
}
