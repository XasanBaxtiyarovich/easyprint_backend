import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCompanyDto{
    @ApiProperty({ example: 'Easygo', description: 'Company name' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ example: 30000, description: 'Company delivery price' })
    delivery_price: number;
  
    @ApiProperty({ example: true, description: 'Company print' })
    print: boolean;
}