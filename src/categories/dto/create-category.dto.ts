import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Easygo', description: 'Category name' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ example: 0, description: 'Category parent id' })
    parent_id: number;
  
    @ApiProperty({ example: 0, description: 'Category parent id step' })
    step: number;
}