import ClientRepository from "domain/entity/client/ClientRepository";

export default class FinalContratoUser {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(id_empresa: number, id_client: number): Promise<any> {
        return await this.clientRepository.finalContract(id_empresa, id_client);
    }
}