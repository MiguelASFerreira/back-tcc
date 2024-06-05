import EmpresaRepository from "domain/entity/empresa/EmpresaRepository";

export default class FindContratoEmpresa {
    constructor(private readonly empresaRepository: EmpresaRepository) {}

    async execute(id_empresa: number, id_servico?: number) {
        return await this.empresaRepository.findContratoEmpresa(id_empresa, id_servico)
    }
}