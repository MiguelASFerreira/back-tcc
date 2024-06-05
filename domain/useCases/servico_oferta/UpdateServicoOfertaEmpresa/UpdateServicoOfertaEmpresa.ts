import ServicoOfertaRepository from "domain/entity/servico_oferta/ServicoOfertaRepository";

export default class UpdateServicoOfertaEmpresa {
    constructor(private readonly servicoOfertaRepository: ServicoOfertaRepository) {}

    async execute(valor: number, id_empresa: number, id_servico: number) {
        return await this.servicoOfertaRepository.updateServicoOfertaEmpresa(valor, id_empresa, id_servico)
    }
}