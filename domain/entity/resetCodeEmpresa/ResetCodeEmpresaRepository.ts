export default interface ResetCodeEmpresaRepository {
    createCodeEmpresa(id_empresa: number, code: number): Promise<any>;
    existCodeEmpresa(code: number): Promise<boolean>;
    compareCodeEmpresa(code: number): Promise<any>
}