import ResetCodeEmpresaRepository from "domain/entity/resetCodeEmpresa/ResetCodeEmpresaRepository";

export default class ExistsCodeEmpresa {
    constructor(private readonly resetCodeEmpresaRepository: ResetCodeEmpresaRepository) {}

    async execute(code: number): Promise<boolean> {
        return await this.resetCodeEmpresaRepository.existCodeEmpresa(code)
    }
}