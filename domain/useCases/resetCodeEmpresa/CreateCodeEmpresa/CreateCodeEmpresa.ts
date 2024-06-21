import ResetCodeEmpresaRepository from "domain/entity/resetCodeEmpresa/ResetCodeEmpresaRepository";


export default class CreateCodeEmpresa {
    constructor(private readonly resetCodeEmpresaRepository: ResetCodeEmpresaRepository) {}

    async execute(id_empresa: number, code: number): Promise<any> {
        return await this.resetCodeEmpresaRepository.createCodeEmpresa(id_empresa, code)
    }
}