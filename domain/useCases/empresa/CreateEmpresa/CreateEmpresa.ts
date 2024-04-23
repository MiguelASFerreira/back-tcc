import EmpresaRepository from 'domain/entity/empresa/EmpresaRepository';
import { InputCreateEmpresa } from './CreateEmpresa.dto';

export default class CreateEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(data: InputCreateEmpresa) {
    return await this.empresaRepository.createEmpresa(data);
  }
}
