import Client from './Client';

export default interface ClientRepository {
  createClient(data: Client): Promise<Client>;
  updateImageClient(file: string, id_client: number): Promise<any>
  findByEmailUser(email: string): Promise<Client>;
  findByIdUser(id: number): Promise<Client>;
  updateClient(id_client: number, data: Client): Promise<Client>;
}
