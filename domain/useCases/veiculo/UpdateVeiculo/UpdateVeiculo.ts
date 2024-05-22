import VeiculoRepository from "domain/entity/veiculo/VeiculoRepository";
import { InputUpdateVeiculo } from "./UpdateVeiculo.dto";

export default class UpdateVeiculo {
    constructor(private readonly veiculoRepository: VeiculoRepository) {}

    async execute(id: number, id_empresa: number, data: InputUpdateVeiculo) {
        return await this.veiculoRepository.updateVeiculo(id, id_empresa, data)
    }
}