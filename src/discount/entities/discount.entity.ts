import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('discount')
export class Discount {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: "15%", description: "Discount parcent" })
    @Column({ type: 'text', default: null })
    parcent: string

    @ApiProperty({ example: 1, description: "Product primary key id" })
    @Column({ type: 'jsonb', default: null })
    product_id: any

    @ApiProperty({ example: 2, description: "Warehouse primary key id" })
    @Column({ type: 'int', default: null })
    warehouse_id: number

    @ApiProperty({ example: 1, description: "Discount type" })
    @Column({ type: 'int', default: 1 })
    type: number

    @ApiProperty({ example: "1", description: "Cupon company id" })
    @Column({ type: 'int', default: null })
    company_id: number

    @ApiProperty({ example: "1", description: "Cupon company id" })
    @Column({ type: 'int', default: null })
    category_id: any

    @ApiProperty({ example: 1, description: "Discount number" })
    @Column({ type: 'int', default: null })
    discount_number: number

    @ApiProperty({ example: "1", description: "Cupon start date" })
    @Column({ type: 'text' })
    start_date: string

    @ApiProperty({ example: "1", description: "Cupon end date" })
    @Column({ type: 'text' })
    end_date: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}