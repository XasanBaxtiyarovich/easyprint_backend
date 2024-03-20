import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('images')
export class Image {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: "url", description: "Image url" })
    @Column({ type: 'text' })
    name: string

    @ApiProperty({ example: null, description: "Image status, default null" })
    @Column({ type: 'integer', default: 1 })
    status: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
