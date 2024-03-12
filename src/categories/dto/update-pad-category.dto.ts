import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdatePadCategoryDto {
    @ApiProperty({ example: 'Easygo', description: 'Category name' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 0, description: 'Category parent id' })
    @IsNumber()
    @IsNotEmpty()
    parent_id: number;
}