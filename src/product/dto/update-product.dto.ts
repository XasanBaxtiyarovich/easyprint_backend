import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
    @ApiProperty({ example: 'Futbolka', description: 'Product name' })
    name: string;
  
    @ApiProperty({ example: 1, description: 'Product category' })
    category_id: number;
  
    @ApiProperty({ example: 0, description: 'Product status' })
    status: number;
  
    @ApiProperty({ example: 'Uzb', description: 'Product manufacturer country' })
    manufacturer_country: string;
  
    @ApiProperty({ example: "Cotton polister", description: 'Product material composition' })
    material_composition: string;
  
    @ApiProperty({ example: 0, description: 'Product price' })
    price: number;
  
    @ApiProperty({ example: 'Made in Uzbekistan', description: 'Product description' })
    description: string;
}
