import EmpresaRepository from "domain/entity/empresa/EmpresaRepository";

export default class EsqueciSenhaEmpresa {
    constructor(private readonly empresaRepository: EmpresaRepository) {}
    
    async execute(id_empresa: number, senha: string): Promise<any> {
        return await this.empresaRepository.esqueciSenha(id_empresa, senha)
    }
}