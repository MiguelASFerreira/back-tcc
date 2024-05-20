import { Inject, Injectable } from '@nestjs/common';
import Servico from 'domain/entity/servico/Servico';
import { Sequelize } from 'sequelize-typescript';
import { CreateServicoBody } from './dto/servico.dto';
import ServicoRepositoryInSequelize from 'src/adapters/repository/servico/ServicoRepositoryInSequelize';
import CreateServico from 'domain/useCases/servico/CreateServico/CreateServico';

@Injectable()
export class ServicoService {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    createServico(data: CreateServicoBody): Promise<Servico> {
        const servicoRepositoryInSequelize = new ServicoRepositoryInSequelize(this.sequelize);

        const useCase = new CreateServico(servicoRepositoryInSequelize);

        return useCase.execute(data);
    }
}
