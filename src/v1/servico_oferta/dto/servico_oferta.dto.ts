import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoOfertaBody {
  @ApiProperty()
  id_servico: number;

  @ApiProperty()
  vl_servico: number;
}

export class FilterServicoOfertaQuery {
  // @ApiProperty({required: false})
  // id_servicoOferta?: number;

  @ApiProperty({ required: false })
  id_empresa?: number;

  @ApiProperty({ required: false })
  rota_inicio?: string;

  @ApiProperty({ required: false })
  rota_fim?: string;
}
