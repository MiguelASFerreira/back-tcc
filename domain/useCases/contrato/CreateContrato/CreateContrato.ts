import ContratoRespository from 'domain/entity/contrato/ContratoRepository';
import { InputCreateContrato } from './CreateContrato.dto';

export default class CreateContrato {
  constructor(private readonly contratoRepository: ContratoRespository) {}

  async execute(data: InputCreateContrato) {
    return await this.contratoRepository.createContrato(data);
  }
}
