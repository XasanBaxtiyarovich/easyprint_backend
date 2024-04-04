import { ApiProperty } from "@nestjs/swagger";

import { Role } from "src/role/entities";

export class UpdateUserDto{
    @ApiProperty({ example: 'Jon', description: 'User first name' })
    first_name?: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    last_name?: string;

    @ApiProperty({ example: 'Joe', description: 'User last name' })
    middle_name?: string;

    @ApiProperty({ example: 'email@example.com', description: 'User email address' })
    email?: string;

    @ApiProperty({ example: 'John', description: 'User first name' })
    phone_number?: string;

    @ApiProperty({ example: 1, description: 'User gender' })
    gender?: number;

    @ApiProperty({ example: "12.02.2024", description: 'User birthday date'})
    birth_date?: string;

    @ApiProperty({ example: 1, description: 'Role primary key id'}) 
    role?: Role;

    @ApiProperty({ example: 1, description: 'Company primary key id'}) 
    company_id?: number;
}