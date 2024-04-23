import Empresa from 'domain/entity/empresa/Empresa';
import EmpresaRepository from 'domain/entity/empresa/EmpresaRepository';

export default class FindByEmailEmpresa {
  constructor(private readonly empresaRepository: EmpresaRepository) {}

  async execute(email: string): Promise<Empresa> {
    return await this.empresaRepository.findByEmailEmpresa(email);
  }
}
