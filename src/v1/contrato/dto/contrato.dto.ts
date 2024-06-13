import { ApiProperty } from "@nestjs/swagger";


export class CreateContratoBody {
    @ApiProperty()
    id_servico: number;

    @ApiProperty()
    id_empresa: number;

    @ApiProperty()
    vl_total: number;

    @ApiProperty()
    vl_desconto: number;

    @ApiProperty()
    dt_inicio: Date;

    @ApiProperty()
    dt_fim: Date;

    @ApiProperty()
    dt_contrato: Date;
}

export class UpdateAddDesconto {
    @ApiProperty()
    desconto: number
}