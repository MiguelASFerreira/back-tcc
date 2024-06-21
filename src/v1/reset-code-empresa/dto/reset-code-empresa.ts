import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail} from "class-validator";

export class ResetCodeEmpresaBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}