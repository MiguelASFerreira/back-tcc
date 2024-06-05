import { ApiProperty } from '@nestjs/swagger';

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
