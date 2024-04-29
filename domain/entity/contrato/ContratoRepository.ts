import Contrato from "./Contrato";

export default interface ContratoRespository {
    createContrato(data: Contrato): Promise<Contrato>;
    findContratoUser(id: number): Promise<Contrato>;
}