import Empresa from './Empresa';

export default interface EmpresaRepository {
  createEmpresa(data: Empresa): Promise<Empresa>;
  findByIdEmpresa(id: number): Promise<Empresa>;
  findByEmailEmpresa(email: string): Promise<Empresa>;
  updateEmpresa(id_empresa: number, data: Empresa): Promise<Empresa>;
  findContratoEmpresa(id_empresa: number, id_servico?: number): Promise<any>;
  finalContract(id_empresa: number, id_client: number): Promise<any>;
  addImageEmpresa(id: number, path: string): Promise<any>;
}
