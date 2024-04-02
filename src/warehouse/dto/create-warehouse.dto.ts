import { ApiProperty } from "@nestjs/swagger";

export class CreateWarehouseDto {
    @ApiProperty({ example: 'Futbolka', description: 'Warehouse name' })
    name: string;

    @ApiProperty({ example: 1, description: 'Warehouse company' })
    company_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse product' })
    product_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse color' })
    color_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse size' })
    size_id: any;

    @ApiProperty({ example: 12000, description: 'Warehouse quantity' })
    quantity: number;

    @ApiProperty({ example: 12000, description: 'Warehouse price' })
    price: number;
  
    @ApiProperty({ example: 12000, description: 'Warehouse quantity' })
    status: number;
    
    @ApiProperty({ example: 'Uzb', description: 'Warehouse manufacturer country' })
    manufacture_country: string;

    @ApiProperty({ example: "Cotton polister", description: 'Warehouse material composition' })
    material_composition: string;
  
    @ApiProperty({ example: 'Made in Uzbekistan', description: 'Product description' })
    description: string;
  
    @ApiProperty({ example: 12000, description: 'Warehouse quantity' })
    type: number;
}