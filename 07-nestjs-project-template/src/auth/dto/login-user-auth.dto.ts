import { ApiProperty } from "@nestjs/swagger";
import { IsLowercase, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserAuthDto{
    @ApiProperty({
        example:"jperez",
        description: "enter a username in lowercase",
        required: true,
        uniqueItems: true,
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    @IsLowercase()
    username: string;
    
    @ApiProperty({
        example:'ABCdef123@',
        description: "enter a password, it must have an uppercase letter, lowercase letter and a number",
        required: true,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}
