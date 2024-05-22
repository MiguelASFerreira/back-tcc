export default class Veiculo {
    readonly id?: number;
    readonly nome: string;
    readonly placa?: string;
    readonly capacidade: number;
    readonly empresa_id: number;
    readonly adaptavel: boolean;
  
    constructor(
      nome: string,
      capacidade: number,
      empresa_id: number,
      adaptavel: boolean,
      placa?: string,
    ) {
      this.nome = nome;
      this.placa = placa;
      this.capacidade = capacidade;
      this.empresa_id = empresa_id;
      this.adaptavel = adaptavel;
    }
  }
  