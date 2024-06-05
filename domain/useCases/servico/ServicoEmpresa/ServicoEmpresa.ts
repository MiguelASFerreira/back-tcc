import ServicoRepository from "domain/entity/servico/ServicoRepository";


export default class ServicoEmpresa {
    constructor(private readonly servicoRepository: ServicoRepository) {}

    async execute(id_empresa: number) {
        return await this.servicoRepository.servicoEmpresa(id_empresa)
    }
}