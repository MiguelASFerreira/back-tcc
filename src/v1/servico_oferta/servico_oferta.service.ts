import { Inject, Injectable } from '@nestjs/common';
import {QueryServicoOferta, ServicoOferta} from 'domain/entity/servico_oferta/ServicoOferta';
import { Sequelize } from 'sequelize-typescript';
import { CreateServicoOfertaBody, FilterServicoOfertaQuery } from './dto/servico_oferta.dto';
import ServicoOfertaRepositoryInSequelize from 'src/adapters/repository/servico_oferta/ServicoOfertaRepositoryInSequelize';
import CreateServicoOferta from 'domain/useCases/servico_oferta/CreateServicoOferta/CreateServicoOferta';
import FilterServicoOferta from 'domain/useCases/servico_oferta/FilterServicoOferta/FilterServicoOferta';
import DeleteServicoOfertaEmpresa from 'domain/useCases/servico_oferta/DeleteServicoOfertaEmpresa/DeleteServicoOfertaEmpresa';
import UpdateServicoOfertaEmpresa from 'domain/useCases/servico_oferta/UpdateServicoOfertaEmpresa/UpdateServicoOfertaEmpresa';

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

    deleteServicoOfertaEmpresa(id_empresa: number, id_servico: number): Promise<any> {
        const servicoOfertaRepositoryInSequelize = new ServicoOfertaRepositoryInSequelize(this.sequelize);

        const useCase = new DeleteServicoOfertaEmpresa(servicoOfertaRepositoryInSequelize)

        return useCase.execute(id_empresa, id_servico)
    }

    updateServicoOfertaEmpresa(valor: number, id_empresa: number, id_servico: number): Promise<any> {
        const servicoOfertaRepositoryInSequelize = new ServicoOfertaRepositoryInSequelize(this.sequelize);

        const useCase = new UpdateServicoOfertaEmpresa(servicoOfertaRepositoryInSequelize)

        return useCase.execute(valor, id_empresa, id_servico)
    }
    
}
