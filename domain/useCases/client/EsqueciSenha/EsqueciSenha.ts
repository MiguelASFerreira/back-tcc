import ClientRepository from "domain/entity/client/ClientRepository";


export default class EsqueciSenha {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(id_client: number, senha: string): Promise<any> {
        return await this.clientRepository.esqueciSenha(id_client, senha);
    }
}