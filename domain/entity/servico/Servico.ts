export default class Servico {
  readonly id?: number;
  readonly rota_inicio: string;
  readonly rota_fim: string;

  constructor(rota_inicio: string, rota_fim: string) {
    this.rota_inicio = rota_inicio,
    this.rota_fim = rota_fim
  }
}
