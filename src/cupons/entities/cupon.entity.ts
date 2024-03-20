import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('cupon')
export class Cupon {
    @ApiProperty({ example: 1, description: "Unique ID" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: "15%", description: "Cupon parcent" })
    @Column({ type: 'text', default: null })
    parcent: string

    @ApiProperty({ example: "12000", description: "Cupon price" })
    @Column({ type: 'int', default: null })
    price: number

    @ApiProperty({ example: "1", description: "Cupon company id" })
    @Column({ type: 'int', default: null })
    company_id: number

    @ApiProperty({ example: "new yer salle", description: "Cupon name" })
    @Column({ type: 'text' })
    name: string

    @ApiProperty({ example: "12000", description: "Cupon min price" })
    @Column({ type: 'int' })
    min_price: number

    @ApiProperty({ example: "1", description: "Cupon order count" })
    @Column({ type: 'int' })
    order_count: number

    @ApiProperty({ example: "1", description: "Cupon start date" })
    @Column({ type: 'text' })
    start_date: string

    @ApiProperty({ example: "1", description: "Cupon end date" })
    @Column({ type: 'text' })
    end_date: string

    @ApiProperty({ example: "1", description: "Cupon type" })
    @Column({ type: 'int' })
    type: number

    @ApiProperty({ example: "0", description: "Cupon status" })
    @Column({ type: 'int' })
    status: number

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
