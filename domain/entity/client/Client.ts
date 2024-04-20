export default class Client {
  readonly email: string;
  readonly password: string;
  readonly nome: string;
  readonly cpf: string;
  readonly data_nascimento: string;
  readonly cep: string;
  readonly n_casa: number;
  readonly bairro: string;
  readonly municipio: string;
  readonly telefone: number;

  constructor(
    email: string,
    password: string,
    nome: string,
    cpf: string,
    data_nascimento: string,
    cep: string,
    n_casa: number,
    bairro: string,
    municipio: string,
    telefone: number,
  ) {
    this.email = email;
    this.password = password;
    this.nome = nome;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.cep = cep;
    this.n_casa = n_casa;
    this.bairro = bairro;
    this.municipio = municipio;
    this.telefone = telefone;
  }
}
