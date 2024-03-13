import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Futbolka', description: 'Product name' })
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ example: 1, description: 'Product category' })
    @IsNotEmpty()
    category_id: number;
  
    @ApiProperty({ example: 0, description: 'Product status' })
    @IsNotEmpty()
    status: number;
  
    @ApiProperty({ example: 'Uzb', description: 'Product manufacturer country' })
    @IsNotEmpty()
    manufacturer_country: string;
  
    @ApiProperty({ example: "Cotton polister", description: 'Product material composition' })
    @IsNotEmpty()
    material_composition: string;
  
    @ApiProperty({ example: 0, description: 'Product price' })
    @IsNotEmpty()
    price: number;
  
    @ApiProperty({ example: 'Made in Uzbekistan', description: 'Product description' })
    @IsNotEmpty()
    description: string;
}
