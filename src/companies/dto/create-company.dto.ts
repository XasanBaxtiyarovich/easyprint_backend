import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto{
    @ApiProperty({ example: 'Easygo', description: 'Company name' })
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty({ example: 30000, description: 'Company delivery price' })
    delivery_price: number;
  
    @ApiProperty({ example: true, description: 'Company print' })
    print: boolean;
}