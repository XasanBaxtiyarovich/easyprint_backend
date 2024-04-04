import { ApiProperty } from "@nestjs/swagger";

export class GetWarehouseDto {
    @ApiProperty({ example: 1, description: 'Warehouse company' })
    company_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse product' })
    product_id: any;
}