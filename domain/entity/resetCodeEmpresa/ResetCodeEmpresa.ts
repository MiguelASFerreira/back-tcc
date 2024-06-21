export default class ResetCodeEmpresa {
    readonly id?: number;
    readonly code: number;
    readonly id_cliente: number;

    constructor(
        code: number,
        id_cliente: number
    ) {
        this.code = code,
        this.id_cliente = id_cliente
    }
}