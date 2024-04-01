import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateDiscountDto {
    @ApiProperty({ example: "15%", description: "Discount parcent" })
    @IsNotEmpty()
    parcent: string

    @ApiProperty({ example: 1, description: "Product primary key id" })
    product_id: any

    @ApiProperty({ example: 2, description: "Warehouse primary key id" })
    warehouse_id: number

    @ApiProperty({ example: 1, description: "Discount type" })
    type: number

    @ApiProperty({ example: "1", description: "Cupon company id" })
    company_id: number

    @ApiProperty({ example: "1", description: "Cupon category id" })
    category_id: any

    @ApiProperty({ example: "1", description: "Cupon sub vategory id" })
    sub_category_id: number

    @ApiProperty({ example: "1", description: "Cupon start date" })
    @IsNotEmpty()
    start_date: string

    @ApiProperty({ example: "1", description: "Cupon end date" })
    @IsNotEmpty()
    end_date: string
}