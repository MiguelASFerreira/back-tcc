import ContratoRespository from "domain/entity/contrato/ContratoRepository";


export default class AddDesconto {
    constructor(private readonly contratoRepository: ContratoRespository) {}

    async execute(id_client: number, id_empresa: number, desconto: number): Promise<any> {
        return await this.contratoRepository.addDesconto(id_client, id_empresa, desconto)
    }
}