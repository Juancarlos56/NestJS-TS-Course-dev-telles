import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsPhoneNumber, IsPositive, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateDepartmentDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @IsNotEmpty()
    name: string;
}
