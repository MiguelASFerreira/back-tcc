import ServicoOfertaRepository from "domain/entity/servico_oferta/ServicoOfertaRepository";
import { InputFilterServicoOferta } from "./FilterServicoOferta.dto";

export default class FilterServicoOferta {
    constructor(private readonly servicoOfertaRepository: ServicoOfertaRepository) {}

    async execute(query: InputFilterServicoOferta) {
        return await this.servicoOfertaRepository.filterServicoOferta(query)
    }
}