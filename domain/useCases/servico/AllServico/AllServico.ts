import ServicoRepository from "domain/entity/servico/ServicoRepository";


export default class AllServico {
    constructor(private readonly servicoRepository: ServicoRepository) {}

    async execute() {
        return await this.servicoRepository.allServicos()
    }
}