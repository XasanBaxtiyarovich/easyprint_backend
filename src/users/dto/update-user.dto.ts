import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

import { Role } from "src/role/entities";

export class UpdateUserDto{
    @ApiProperty({ example: 'John', description: 'User first name' })
    firstname?: string;
  
    @ApiProperty({ example: 'Doe', description: 'User last name' })
    lastname?: string;
  
    @ApiProperty({ example: 'email@example.com', description: 'User email address' })
    email?: string;

    @ApiProperty({ example: 1, description: 'Role primary key id'})  
    role: Role;
}