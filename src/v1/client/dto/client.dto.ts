import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClientBody {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  data_nascimento: string;

  @ApiProperty()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  n_casa: string;

  @ApiProperty()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty()
  @IsNotEmpty()
  logradouro: string;

  @ApiProperty()
  @IsNotEmpty()
  municipio: string;

  @ApiProperty()
  @IsNotEmpty()
  telefone: number;
}

export class FindByEmailBody {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UpdateClientBody {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  @IsNotEmpty()
  cpf: string;

  @ApiProperty()
  @IsNotEmpty()
  data_nascimento: string;

  @ApiProperty()
  @IsNotEmpty()
  cep: string;

  @ApiProperty()
  @IsNotEmpty()
  n_casa: string;

  @ApiProperty()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty()
  @IsNotEmpty()
  logradouro: string;

  @ApiProperty()
  @IsNotEmpty()
  municipio: string;

  @ApiProperty()
  @IsNotEmpty()
  telefone: number;
}

export class EsqueciSenhaBody {
  @ApiProperty()
  @IsNotEmpty()
  novaSenha: string;
}