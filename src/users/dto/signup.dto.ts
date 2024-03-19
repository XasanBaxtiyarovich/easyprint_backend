import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

import { Role } from "src/role/entities";

export class SignUpDto{
    @ApiProperty({ example: 'John', description: 'User first name' })
    @IsString()
    @IsNotEmpty()
    firstname: string;
  
    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @IsString()
    @IsNotEmpty()
    lastname: string;
  
    @ApiProperty({ example: 'email@example.com', description: 'User email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(22)
    password: string;

    @ApiProperty({ example: 1, description: 'Role primary key id'}) 
    role: Role;

    @ApiProperty({ example: 1, description: 'Company primary key id'}) 
    company_id: number;
}