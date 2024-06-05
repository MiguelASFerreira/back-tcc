import { Inject, Injectable } from '@nestjs/common';
import Servico from 'domain/entity/servico/Servico';
import { Sequelize } from 'sequelize-typescript';
import { CreateServicoBody } from './dto/servico.dto';
import ServicoRepositoryInSequelize from 'src/adapters/repository/servico/ServicoRepositoryInSequelize';
import CreateServico from 'domain/useCases/servico/CreateServico/CreateServico';
import AllServico from 'domain/useCases/servico/AllServico/AllServico';
import ServicoEmpresa from 'domain/useCases/servico/ServicoEmpresa/ServicoEmpresa';

@Injectable()
export class ServicoService {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    createServico(data: CreateServicoBody): Promise<Servico> {
        const servicoRepositoryInSequelize = new ServicoRepositoryInSequelize(this.sequelize);

        const useCase = new CreateServico(servicoRepositoryInSequelize);

        return useCase.execute(data);
    }

    allServico(): Promise<Servico> {
        const servicoRepositoryInSequelize = new ServicoRepositoryInSequelize(this.sequelize);

        const useCase = new AllServico(servicoRepositoryInSequelize)

        return useCase.execute()
    }

    servicoEmpresa(id_empresa: number): Promise<any> {
        const servicoRepositoryInSequelize = new ServicoRepositoryInSequelize(this.sequelize);

        const useCase = new ServicoEmpresa(servicoRepositoryInSequelize)

        return useCase.execute(id_empresa)
    }
}
