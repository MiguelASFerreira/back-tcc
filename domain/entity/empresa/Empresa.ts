export default class Empresa {
  readonly id?: number;
  readonly email: string;
  readonly password: string;
  readonly nome: string;
  readonly dono: string;
  readonly image_url?: string;
  readonly telefone1: number;
  readonly telefone2: number;

  constructor(
    email: string,
    password: string,
    nome: string,
    dono: string,
    image_url: string,
    telefone1: number,
    telefone2: number,
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.dono = dono;
    this.image_url = image_url;
    this.telefone1 = telefone1;
    this.telefone2 = telefone2;
  }
}
