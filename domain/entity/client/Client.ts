export default class Client {
  readonly id?: number;
  readonly email: string;
  readonly password: string;
  readonly nome: string;
  readonly cpf: string;
  readonly data_nascimento: string;
  readonly image_url?: string;
  readonly cep: string;
  readonly n_casa: string;
  readonly bairro: string;
  readonly logradouro: string;
  readonly municipio: string;
  readonly telefone: number;

  constructor(
    email: string,
    password: string,
    nome: string,
    cpf: string,
    data_nascimento: string,
    image_url: string,
    cep: string,
    n_casa: string,
    bairro: string,
    logradouro: string,
    municipio: string,
    telefone: number,
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.image_url = image_url;
    this.cep = cep;
    this.n_casa = n_casa;
    this.bairro = bairro;
    this.logradouro = logradouro;
    this.municipio = municipio;
    this.telefone = telefone;
  }
}
