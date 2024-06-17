import ClientRepository from "domain/entity/client/ClientRepository";

export default class AddImageClient {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(id: number, path: string): Promise<any> {
        return await this.clientRepository.addImageClient(id, path)
    }
}