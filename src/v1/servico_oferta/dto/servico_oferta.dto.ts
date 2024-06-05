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

export class ServicoExists {
  id_servico: number;
  id_servicoOferta: number;
  id_empresa: number;
  rota_inicio: string;
  rota_fim: string;
  vl_servico: string;
}

export class UpdateServicoOferta {
  @ApiProperty()
  id_servico: number;

  @ApiProperty()
  valor: number;
}

export class DeleteServicoOferta {
  @ApiProperty()
  id_servico: number;
}