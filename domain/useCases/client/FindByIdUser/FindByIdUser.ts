import ClientRepository from 'domain/entity/client/ClientRepository';

export default class FindById {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(id: number) {
    return await this.clientRepository.findByIdUser(id);
  }
}
