import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateColorDto {
    @ApiProperty({ example: "yashil", description: "Color name" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "rgb1222231", description: "Color code" })
    @IsString()
    @IsNotEmpty()
    code: string
}