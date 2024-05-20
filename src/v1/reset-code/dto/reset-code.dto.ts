import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail} from "class-validator";

export class ResetCodeBody {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
}