import ClientRepository from 'domain/entity/client/ClientRepository';

export default class UpdateImageClient {
  constructor(private readonly clientRepository: ClientRepository) {}

  async execute(file: Express.Multer.File, id_client: number): Promise<any> {
    return await this.clientRepository.updateImageClient(file.filename, id_client)
  }
}
