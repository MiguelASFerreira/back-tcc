import ClientRepository from 'domain/entity/client/ClientRepository';
import { InputCreateClient } from './CreateClient.dto';

export default class CreateClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(data: InputCreateClient) {
    return await this.clientRepository.createClient(data);
  }
}
