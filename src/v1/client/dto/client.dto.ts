import { ApiProperty } from '@nestjs/swagger';

export class CreateClientBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  data_nascimento: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  n_casa: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  telefone: number;
}

export class FindByEmailBody {
  @ApiProperty()
  email: string;
}

export class UpdateClientBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  cpf: string;

  @ApiProperty()
  data_nascimento: string;

  @ApiProperty()
  cep: string;

  @ApiProperty()
  n_casa: string;

  @ApiProperty()
  bairro: string;

  @ApiProperty()
  municipio: string;

  @ApiProperty()
  telefone: number;
}
