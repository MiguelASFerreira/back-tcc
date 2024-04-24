import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoBody {
  @ApiProperty()
  rota_inicio: string;

  @ApiProperty()
  rota_fim: string;
}

