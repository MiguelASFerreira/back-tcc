import Empresa from 'domain/entity/empresa/Empresa';
import EmpresaRepository from 'domain/entity/empresa/EmpresaRepository';

export default class FindByIdEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(id: number): Promise<Empresa> {
    return await this.empresaRepository.findByIdEmpresa(id);
  }
}
