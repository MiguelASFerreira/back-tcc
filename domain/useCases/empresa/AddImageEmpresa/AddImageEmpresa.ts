import EmpresaRepository from "domain/entity/empresa/EmpresaRepository";

export default class AddImageEmpresa {
    constructor(private readonly empresaRepository: EmpresaRepository) {}

    async execute(id: number, path: string): Promise<any> {
        return await this.empresaRepository.addImageEmpresa(id, path)
    }
}