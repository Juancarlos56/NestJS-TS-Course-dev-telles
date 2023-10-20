import { IsString, MinLength } from "class-validator";

export class CreateCarDTO{
    @IsString({message:'El brand debe ser string'})
    readonly brand: string;
    @IsString()
    @MinLength(3)
    readonly model: string;
}