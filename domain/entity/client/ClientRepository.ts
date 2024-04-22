import Client from './Client';

export default interface ClientRepository {
  createClient(data: Client): Promise<Client>;
  findByEmailUser(email: string): Promise<Client>;
  findByIdUser(id: number): Promise<Client>;
}
