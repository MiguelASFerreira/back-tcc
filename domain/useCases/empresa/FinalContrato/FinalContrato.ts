import EmpresaRepository from "domain/entity/empresa/EmpresaRepository";

export default class FinalContrato {
    constructor(private readonly empresaRepository: EmpresaRepository) {}

    async execute(id_client: number, id_empresa: number): Promise<any> {
        return await this.empresaRepository.finalContract(id_empresa, id_client);
    }
}