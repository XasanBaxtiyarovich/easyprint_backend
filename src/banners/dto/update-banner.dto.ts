import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBannerDto {
    @ApiProperty({ example: 'title', description: 'Banner title' })
    @IsString()
    @IsNotEmpty()
    title: string;
  
    @ApiProperty({ example: 'text', description: 'Banner text' })
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty({ example: 0, description: 'Product status' })
    is_active: number;
}