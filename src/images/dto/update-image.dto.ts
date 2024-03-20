import { ApiProperty } from "@nestjs/swagger";

export class UpdateImageDto {
    @ApiProperty({ example: null, description: "Image status, default null" })
    status: number;
}