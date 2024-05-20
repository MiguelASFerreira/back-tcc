import { Inject, Injectable } from '@nestjs/common';
import {QueryServicoOferta, ServicoOferta} from 'domain/entity/servico_oferta/ServicoOferta';
import { Sequelize } from 'sequelize-typescript';
import { CreateServicoOfertaBody, FilterServicoOfertaQuery } from './dto/servico_oferta.dto';
import ServicoOfertaRepositoryInSequelize from 'src/adapters/repository/servico_oferta/ServicoOfertaRepositoryInSequelize';
import CreateServicoOferta from 'domain/useCases/servico_oferta/CreateServicoOferta/CreateServicoOferta';
import FilterServicoOferta from 'domain/useCases/servico_oferta/FilterServicoOferta/FilterServicoOferta';

@Injectable()
export class ServicoOfertaService {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    createServicoOferta(id_empresa: number, data: CreateServicoOfertaBody): Promise<ServicoOferta> {
        const servicoOfertaRepositoryInSequelize = new ServicoOfertaRepositoryInSequelize(this.sequelize);

        const useCase = new CreateServicoOferta(servicoOfertaRepositoryInSequelize);

        return useCase.execute(id_empresa, {
            id_servico: data.id_servico,
            vl_servico: data.vl_servico
        })
    }

    filterServicoOferta(query: FilterServicoOfertaQuery): Promise<QueryServicoOferta> {
        const servicoOfertaRepositoryInSequelize = new ServicoOfertaRepositoryInSequelize(this.sequelize);

        const useCase = new FilterServicoOferta(servicoOfertaRepositoryInSequelize);

        return useCase.execute(query);
    }
}
