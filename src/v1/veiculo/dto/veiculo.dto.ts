import { ApiProperty } from "@nestjs/swagger";

export class CreateVeiculoBody {
    @ApiProperty()
    nome: string;
  
    @ApiProperty({ required: false })
    placa?: string;
  
    @ApiProperty()
    capacidade: number;
  
    @ApiProperty()
    adaptavel: boolean;
  }

  export class UpdateVeiculoBody {
    @ApiProperty()
    nome: string;
  
    @ApiProperty({ required: false })
    placa?: string;
  
    @ApiProperty()
    capacidade: number;
  
    @ApiProperty()
    adaptavel: boolean;

    empresa_id: number;
  }