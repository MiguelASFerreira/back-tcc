import Client from "domain/entity/client/Client";
import ClientRepository from "domain/entity/client/ClientRepository";
import { InputUpdateClient } from "./UpdateClient.dto";


export default class UpdateClient {
    constructor(private readonly clientRepository: ClientRepository) {}

    async execute(id: number, data: InputUpdateClient):Promise<Client> {
        return await this.clientRepository.updateClient(id, data);
    }
}