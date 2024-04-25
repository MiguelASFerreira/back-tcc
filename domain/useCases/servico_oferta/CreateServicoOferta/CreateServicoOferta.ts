import ServicoOfertaRepository from "domain/entity/servico_oferta/ServicoOfertaRepository";
import { InputCreateServicoOferta } from "./CreateServicoOferta.dto";


export default class CreateServicoOferta {
    constructor(private readonly servicoOfertaRepository: ServicoOfertaRepository) {}

    async execute(id_empresa: number, data: InputCreateServicoOferta) {
        return await this.servicoOfertaRepository.createServicoOferta({
            id_empresa: id_empresa,
            id_servico: data.id_servico,
            vl_servico: data.vl_servico
        });
    }
}