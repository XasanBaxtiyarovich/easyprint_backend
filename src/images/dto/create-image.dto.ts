import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
    @ApiProperty({ example: null, description: "Image status, default null" })
    status: number;
}