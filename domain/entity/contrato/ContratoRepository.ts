import Contrato from "./Contrato";

export default interface ContratoRespository {
    createContrato(data: Contrato): Promise<Contrato>;
    findContratoUser(id: number): Promise<Contrato>;
    addDesconto(id_client: number, id_empresa: number, desconto: number): Promise<any>
}