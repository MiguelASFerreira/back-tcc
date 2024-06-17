import Client from './Client';

export default interface ClientRepository {
  createClient(data: Client): Promise<Client>;
  findByEmailUser(email: string): Promise<Client>;
  findByIdUser(id: number): Promise<Client>;
  updateClient(id_client: number, data: Client): Promise<Client>;
  esqueciSenha(id_client: number, senha: string): Promise<any>;
  finalContract(id_empresa: number, id_client: number): Promise<any>;
  addImageClient(id: number, path: string): Promise<any>;
}
