import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto{
    @ApiProperty({
        description: "¿Cuántas filas necesitas?",
        default: 10, 
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        description: "¿Cuántas filas necesitas saltarte?",
        default: 0, 
    })
    @IsOptional()
    @Type(() => Number)
    offset?: number;

}