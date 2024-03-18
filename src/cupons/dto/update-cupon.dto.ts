import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCuponDto {
    @ApiProperty({ example: "15%", description: "Cupon parcent" })
    parcent: string

    @ApiProperty({ example: "12000", description: "Cupon price" })
    price: number

    @ApiProperty({ example: "1", description: "Cupon company id" })
    company_id: number

    @ApiProperty({ example: "new yer salle", description: "Cupon name" })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: "12000", description: "Cupon min price" })
    @IsNumber()
    @IsNotEmpty()
    min_price: number

    @ApiProperty({ example: "1", description: "Cupon order count" })
    @IsNumber()
    @IsNotEmpty()
    order_count: number

    @ApiProperty({ example: "1", description: "Cupon start date" })
    @IsNotEmpty()
    start_date: string

    @ApiProperty({ example: "1", description: "Cupon end date" })
    @IsNotEmpty()
    end_date: string

    @ApiProperty({ example: "1", description: "Cupon type" })
    @IsNumber()
    @IsNotEmpty()
    type: number

    @ApiProperty({ example: "0", description: "Cupon status" })
    @IsNumber()
    @IsNotEmpty()
    status: number
}
