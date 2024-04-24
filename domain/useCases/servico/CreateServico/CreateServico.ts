import ServicoRepository from "domain/entity/servico/ServicoRepository";
import { InputCreateServico } from "./CreateServico.dto";


export default class CreateServico {
    constructor(private readonly servicoRepository: ServicoRepository) {}

    async execute(data: InputCreateServico) {
        return await this.servicoRepository.createServico(data);
    }
}