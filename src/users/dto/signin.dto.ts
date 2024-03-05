import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignInDto{
    @ApiProperty({ example: 'email@example.com', description: 'User email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}