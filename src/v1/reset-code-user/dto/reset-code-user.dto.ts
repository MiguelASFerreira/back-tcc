import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail} from "class-validator";

export class ResetCodeUserBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}