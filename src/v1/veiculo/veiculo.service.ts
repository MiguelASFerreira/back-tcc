import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateVeiculoBody } from './dto/veiculo.dto';
import Veiculo from 'domain/entity/veiculo/Veiculo';
import VeiculoRepositoryInSequelize from 'src/adapters/repository/veiculo/VeiculoRepositoryInSequelize';
import CreateVeiculo from 'domain/useCases/veiculo/CreateVeiculo/CreateVeiculo';
import VeiculoByEmpresa from 'domain/useCases/veiculo/VeiculoByEmpresa/VeiculoByEmpresa';
import UpdateVeiculo from 'domain/useCases/veiculo/UpdateVeiculo/UpdateVeiculo';

@Injectable()
export class VeiculoService {
    constructor(@Inject('SEQUELIZE') private readonly sequelize: Sequelize) {}

    createVeiculo(id_empresa: number, data: CreateVeiculoBody): Promise<Veiculo> {
        const veiculoRepositoryInSequelize = new VeiculoRepositoryInSequelize(this.sequelize);

        const useCase = new CreateVeiculo(veiculoRepositoryInSequelize)

        return useCase.execute({
            nome: data.nome,
            placa: data.placa,
            capacidade: data.capacidade,
            empresa_id: id_empresa,
            adaptavel: data.adaptavel
        })
    }

    veiculosByEmpresa(id_empresa: number): Promise<Veiculo[]> {
        const veiculoRepositoryInSequelize = new VeiculoRepositoryInSequelize(this.sequelize);

        const useCase = new VeiculoByEmpresa(veiculoRepositoryInSequelize);

        return useCase.execute(id_empresa)
    }

    updateVeiculo(id: number, id_empresa: number, data: Veiculo): Promise<Veiculo> {
        const veiculoRepositoryInSequelize = new VeiculoRepositoryInSequelize(this.sequelize);

        const useCase = new UpdateVeiculo(veiculoRepositoryInSequelize);

        return useCase.execute(id, id_empresa, data)
    }
}
