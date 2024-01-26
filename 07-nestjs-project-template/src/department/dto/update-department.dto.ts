import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsPositive, IsString, MinLength } from "class-validator";


export class UpdateDepartmentDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: "number",
        default: 0
    })
    @IsInt()
    @IsPositive()
    @IsNotEmpty()
    isActive: number;
}