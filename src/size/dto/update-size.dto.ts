import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateSizeDto {
    @ApiProperty({ example: "xxl", description: "Size" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: 1, description: "Size status" })
    @IsNumber()
    @IsNotEmpty()
    status: number

    @ApiProperty({ example: 1, description: "Size category id" })
    @IsNumber()
    @IsNotEmpty()
    category_id: number
}
