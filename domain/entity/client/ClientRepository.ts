import Client from './Client';

export default interface ClientRepository {
  createClient(data: Client): Promise<Client>;
  findByEmail(email: string): Promise<Client>;
}
