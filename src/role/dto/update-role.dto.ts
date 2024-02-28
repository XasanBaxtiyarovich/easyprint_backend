import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator"

export class UpdateRoleDto {
    @ApiProperty({ example: "admin", description: "Role name" })
    @IsString()
    @IsNotEmpty()
    name: string;
}