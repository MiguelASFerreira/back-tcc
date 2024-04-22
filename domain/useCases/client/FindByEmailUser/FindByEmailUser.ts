import ClientRepository from 'domain/entity/client/ClientRepository';

export default class FindByEmailUser {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(email: string) {
    return await this.clientRepository.findByEmailUser(email);
  }
}
