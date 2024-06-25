import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, isNotEmpty } from 'class-validator';

export class CreateEmpresaBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  dono: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  telefone1: number;

  @ApiProperty()
  cpf: string;
}

export class FindByEmailBody {
  @ApiProperty()
  email: string;
}

export class UpdateEmpresaBody {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  nome: string;

  @ApiProperty()
  dono: string;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  telefone1: number;

  @ApiProperty()
  cpf: string;
}

export class FindAllContrato {
  @ApiProperty()
  id_servico?: number;
}

export class DeleteContrato {
  @ApiProperty()
  id_client: number
}

export class UploadImageEmpresa {
  @ApiProperty()
  image_url: string;
}

export class EsqueciSenhaBody {
  @ApiProperty()
  @IsNotEmpty()
  novaSenha: string;
}