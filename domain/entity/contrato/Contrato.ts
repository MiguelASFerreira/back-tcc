
export default class Contrato {
    readonly id?: number;
    readonly id_servico: number;
    readonly id_cliente: number;
    readonly id_empresa: number;
    readonly vl_total: number;
    readonly vl_desconto: number;
    readonly dt_inicio: Date;
    readonly dt_fim: Date;
    readonly dt_contrato: Date;

    constructor(
        id_servico: number,
        id_cliente: number,
        id_empresa: number,
        vl_total: number,
        vl_desconto: number,
        dt_inicio: Date,
        dt_fim: Date,
        dt_contrato: Date,
    ) {
        this.id_servico = id_servico;
        this.id_cliente = id_cliente;
        this.id_empresa = id_empresa;
        this.vl_total = vl_total;
        this.vl_desconto = vl_desconto;
        this.dt_fim = dt_fim;
        this.dt_inicio = dt_inicio;
        this.dt_contrato = dt_contrato;
    }
}