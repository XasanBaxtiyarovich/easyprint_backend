import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('color')
export class Color {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: "yashil", description: "Color name" })
    @Column({ type: 'text' })
    name: string

    @ApiProperty({ example: "rgb1222231", description: "Color code" })
    @Column({ type: 'text' })
    code: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}