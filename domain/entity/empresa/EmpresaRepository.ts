import Empresa from './Empresa';

export default interface EmpresaRepository {
  createEmpresa(data: Empresa): Promise<Empresa>;
  findByIdEmpresa(id: number): Promise<Empresa>;
  findByEmailEmpresa(email: string): Promise<Empresa>;
  updateEmpresa(id_empresa: number, data: Empresa): Promise<Empresa>;
  findContratoEmpresa(id_empresa: number, id_servico?: number): Promise<any>;
}
