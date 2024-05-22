import VeiculoRepository from "domain/entity/veiculo/VeiculoRepository";
import { InputCreateVeiculo } from "./CreateVeiculo.dto";

export default class CreateVeiculo {
    constructor(private readonly veiculoRepository: VeiculoRepository) {}

    async execute(data: InputCreateVeiculo) {
        return await this.veiculoRepository.createVeiculo(data);
    }
}