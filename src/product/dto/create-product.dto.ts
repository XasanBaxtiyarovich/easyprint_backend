import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Futbolka', description: 'Product name' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ example: 1, description: 'Product category' })
    @IsNotEmpty()
    category_id: number;
  
    @ApiProperty({ example: 0, description: 'Product status' })
    @IsNotEmpty()
    status: number;
  
    @ApiProperty({ example: 'Uzb', description: 'Product manufacturer country' })
    @IsString()
    @IsNotEmpty()
    manufacturer_country: string;
  
    @ApiProperty({ example: "Cotton polister", description: 'Product material composition' })
    @IsString()
    @IsNotEmpty()
    material_composition: string;
  
    @ApiProperty({ example: 0, description: 'Product price' })
    @IsNotEmpty()
    price: number;
  
    @ApiProperty({ example: 'Made in Uzbekistan', description: 'Product description' })
    @IsString()
    @IsNotEmpty()
    description: string;
}
