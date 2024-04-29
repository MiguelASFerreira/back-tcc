import EmpresaRepository from 'domain/entity/empresa/EmpresaRepository';
import { InputUpdateEmpresa } from './UpdateEmpresa.dto';

export default class UpdateEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(id: number, data: InputUpdateEmpresa) {
    return await this.empresaRepository.updateEmpresa(id, data);
  }
}
