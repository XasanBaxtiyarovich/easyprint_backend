import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateDiscountDto {
    @ApiProperty({ example: "15%", description: "Discount parcent" })
    @IsString()
    @IsNotEmpty()
    parcent: string

    @ApiProperty({ example: 1, description: "Product primary key id" })
    @IsNumber()
    @IsNotEmpty()
    product_id: number

    @ApiProperty({ example: "1", description: "Cupon sub vategory id" })
    @IsNumber()
    @IsNotEmpty()
    category_id: number

    @ApiProperty({ example: "1", description: "Cupon start date" })
    @IsNotEmpty()
    start_date: string

    @ApiProperty({ example: "1", description: "Cupon end date" })
    @IsNotEmpty()
    end_date: string
}