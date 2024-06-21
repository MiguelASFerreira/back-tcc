import ResetCodeEmpresaRepository from "domain/entity/resetCodeEmpresa/ResetCodeEmpresaRepository";

export default class CompareCodeEmpresa {
    constructor(private readonly resetCodeEmpresaRepository: ResetCodeEmpresaRepository) {}

    async execute(code: number): Promise<any> {
        return await this.resetCodeEmpresaRepository.compareCodeEmpresa(code)
    }
}