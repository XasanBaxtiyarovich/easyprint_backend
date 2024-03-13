import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('size')
export class Size {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: "xxl", description: "Size" })
    @Column({ type: 'text' })
    name: string

    @ApiProperty({ example: 1, description: "Size status" })
    @Column({ type: 'int' })
    status: number

    @ApiProperty({ example: 1, description: "Size category id" })
    @Column({ type: 'int' })
    category_id: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
