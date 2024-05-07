export default class Client {
  readonly id?: number;
  readonly email: string;
  readonly password: string;
  readonly nome: string;
  readonly image_url?: string;
  readonly cpf: string;
  readonly data_nascimento: string;
  readonly cep: string;
  readonly n_casa: string;
  readonly bairro: string;
  readonly municipio: string;
  readonly telefone: number;

  constructor(
    email: string,
    password: string,
    nome: string,
    image_url: string,
    cpf: string,
    data_nascimento: string,
    cep: string,
    n_casa: string,
    bairro: string,
    municipio: string,
    telefone: number,
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.image_url = image_url;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.cep = cep;
    this.n_casa = n_casa;
    this.bairro = bairro;
    this.municipio = municipio;
    this.telefone = telefone;
  }
}
