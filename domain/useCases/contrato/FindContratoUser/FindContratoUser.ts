import ContratoRespository from "domain/entity/contrato/ContratoRepository";

export default class FindContratoUser {
    constructor(private readonly contratoRepository: ContratoRespository) {}

    async execute(id: number) {
        return await this.contratoRepository.findContratoUser(id);
    }
}