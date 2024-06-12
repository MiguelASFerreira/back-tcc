import VeiculoRepository from "domain/entity/veiculo/VeiculoRepository";

export default class DeleteVeiculo {
    constructor(private readonly veiculoRepository: VeiculoRepository) {}

    async execute(id: number, id_empresa: number): Promise<any> {
        return await this.veiculoRepository.deleteVeiculo(id, id_empresa)
    }
}