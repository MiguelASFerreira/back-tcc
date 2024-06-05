import Servico from "./Servico";

export default interface ServicoRepository {
    createServico(data: Servico): Promise<Servico>;
    allServicos(): Promise<Servico>;
    servicoEmpresa(id_empresa: number): Promise<any>;
}