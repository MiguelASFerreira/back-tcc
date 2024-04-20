import ClientRepository from 'domain/entity/client/ClientRepository';

export default class FindByEmail {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(email: string) {
    return await this.clientRepository.findByEmail(email);
  }
}
