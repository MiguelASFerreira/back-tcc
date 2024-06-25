export default class Empresa {
  readonly id?: number;
  readonly email: string;
  readonly password: string;
  readonly nome: string;
  readonly dono: string;
  readonly image_url: string;
  readonly telefone1: number;
  readonly cpf: string;

  constructor(
    email: string,
    password: string,
    nome: string,
    dono: string,
    image_url: string,
    telefone1: number,
    cpf: string,
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.dono = dono;
    this.image_url = image_url;
    this.telefone1 = telefone1;
    this.cpf = cpf;
  }
}

export class EmpresaInfo {
  readonly id?: number;
  readonly email: string;
  readonly password: string;
  readonly nome: string;
  readonly dono: string;
  readonly image_url: string;
  readonly telefone1: number;
  readonly cpf: string;
  readonly CAPACIDADE_MAXIMA: number;
  readonly QUANTIDADE_VEICULOS: number;

  constructor(
    email: string,
    password: string,
    nome: string,
    dono: string,
    image_url: string,
    telefone1: number,
    cpf: string,
    CAPACIDADE_MAXIMA: number,
    QUANTIDADE_VEICULOS: number,
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.dono = dono;
    this.image_url = image_url;
    this.telefone1 = telefone1;
    this.cpf = cpf;
    this.CAPACIDADE_MAXIMA = CAPACIDADE_MAXIMA;
    this.QUANTIDADE_VEICULOS = QUANTIDADE_VEICULOS;
  }
}
