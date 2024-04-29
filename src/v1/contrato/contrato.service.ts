import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { CreateContratoBody } from './dto/contrato.dto';
import Contrato from 'domain/entity/contrato/Contrato';
import ContratoRepositoryInSequelize from 'src/adapters/repository/contrato/ContratoRepositoryInSequelize';
import CreateContrato from 'domain/useCases/contrato/CreateContrato/CreateContrato';
import FindContratoUser from 'domain/useCases/contrato/FindContratoUser/FindContratoUser';

@Injectable()
export class ContratoService {
  constructor(private readonly sequelize: Sequelize) {}

  createContrato(
    id_cliente: number,
    data: CreateContratoBody,
  ): Promise<Contrato> {
    const contratoRepositoryInSequelize = new ContratoRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new CreateContrato(contratoRepositoryInSequelize);

    return useCase.execute({
      id_servico: data.id_servico,
      id_empresa: data.id_empresa,
      id_cliente: id_cliente,
      dt_contrato: data.dt_contrato,
      vl_desconto: data.vl_desconto,
      dt_inicio: data.dt_inicio,
      dt_fim: data.dt_fim,
    });
  }

  findContratoUser(id_cliente: number): Promise<Contrato> {
    const contratoRepositoryInSequelize = new ContratoRepositoryInSequelize(
      this.sequelize,
    );

    const useCase = new FindContratoUser(contratoRepositoryInSequelize);

    return useCase.execute(id_cliente);
  }
}
