import ServicoOfertaRepository from "domain/entity/servico_oferta/ServicoOfertaRepository";

export default class DeleteServicoOfertaEmpresa {
    constructor(private readonly servicoOfertaRepository: ServicoOfertaRepository) {}

    async execute(id_empresa: number, id_servico: number) {
        return await this.servicoOfertaRepository.deleteServicoOfertaEmpresa(id_empresa, id_servico)
    }
}