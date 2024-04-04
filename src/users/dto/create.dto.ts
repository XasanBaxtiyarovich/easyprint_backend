import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";
import { PersonalInfo } from "src/personal_infos/entities";

import { Role } from "src/role/entities";

export class CreateUser{
    @ApiProperty({ example: 'Jon', description: 'User first name' })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: 'Joe', description: 'User last name' })
    @IsString()
    @IsNotEmpty()
    middle_name: string;

    @ApiProperty({ example: 'email@example.com', description: 'User email address' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({ example: 1, description: 'User gender' })
    @IsNotEmpty()
    gender: number;

    @ApiProperty({ example: "12.02.2024", description: 'User birthday date'})
    @IsString()
    @IsNotEmpty() 
    birth_date: string;
  
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