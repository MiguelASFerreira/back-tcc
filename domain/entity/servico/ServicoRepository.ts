import Servico from "./Servico";

export default interface ServicoRepository {
    createServico(data: Servico): Promise<Servico>;
}