import VeiculoRepository from "domain/entity/veiculo/VeiculoRepository";

export default class VeiculoByEmpresa {
    constructor(private readonly veiculoRepository: VeiculoRepository) {}

    async execute(id_empresa: number) {
        return await this.veiculoRepository.veiculosByEmpresa(id_empresa)
    }
}