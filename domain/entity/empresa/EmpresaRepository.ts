import Empresa from './Empresa';

export default interface EmpresaRepository {
  createEmpresa(data: Empresa): Promise<Empresa>;
  findByIdUser(id: number): Promise<Empresa>;
  findByEmailEmpresa(email: string): Promise<Empresa>;
  updateEmpresa(id_empresa: number, data: Empresa): Promise<Empresa>;
}
