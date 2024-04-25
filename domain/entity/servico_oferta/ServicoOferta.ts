export class ServicoOferta {
    readonly id?: number;
    readonly id_servico: number;
    readonly id_empresa: number;
    readonly vl_servico: number;

    constructor(
        id_servico: number,
        id_empresa: number,
        vl_servico: number,
    ) {
        this.id_servico = id_servico,
        this.id_empresa = id_empresa,
        this.vl_servico = vl_servico
    }
}

export class QueryServicoOferta {
    // readonly id_servicoOferta?: number; 
    readonly id_empresa?: number;
    readonly nomeEmpresa?: string;
    readonly id_servico?: number;
    readonly rota_inicio?: string;
    readonly rota_fim?: string;

    constructor(
        // id_servicoOferta: number,
        id_empresa: number,
        nomeEmpresa: string,
        id_servico: number,
        rota_inicio: string,
        rota_fim: string
    ) {
        // this.id_servicoOferta = id_servicoOferta,
        this.id_empresa = id_empresa,
        this.nomeEmpresa = nomeEmpresa,
        this.id_servico = id_servico,
        this.rota_inicio = rota_inicio,
        this.rota_fim = rota_fim
    }
}