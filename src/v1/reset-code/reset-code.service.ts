import { Inject, Injectable } from '@nestjs/common';
import CreateResetCode from 'domain/useCases/resetCode/CreateCode/CreateResetCode';
import { Sequelize } from 'sequelize-typescript';
import { ResetCodeRepositoryInSequelize } from 'src/adapters/repository/resetCode/ResetCodeRepositoryInSequelize';
import * as crypto from 'crypto';
import ExistsCode from 'domain/useCases/resetCode/ExistsCode/ExistsCode';

@Injectable()
export class ResetCodeService {
  constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

  createResetCode(id_client: number, code: number): Promise<any> {
    const resetCodeRepositoryInSequelize = new ResetCodeRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new CreateResetCode(resetCodeRepositoryInSequelize);

    return useCase.execute(id_client, code);
  }

  existsCode(code: number): Promise<boolean> {
    const resetCodeRepositoryInSequelize = new ResetCodeRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new ExistsCode(resetCodeRepositoryInSequelize)

    return useCase.execute(code)
  }

  generateCode() {
    const code = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    return code;
  }
}
