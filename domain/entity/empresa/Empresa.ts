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
