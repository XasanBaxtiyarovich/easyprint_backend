import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('warehouse')
export class Warehouse {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @ApiProperty({ example: 'Futbolka', description: 'Warehouse name' })
    @Column({ type: 'text', default: null })
    name: string;

    @ApiProperty({ example: 1, description: 'Warehouse company' })
    @Column({ type: 'int' ,default: null })
    company_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse product' })
    @Column({ type: 'int' ,default: null })
    product_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse color' })
    @Column({ type: 'int' ,default: null })
    color_id: any;

    @ApiProperty({ example: 1, description: 'Warehouse size' })
    @Column({ type: 'int' ,default: null })
    size_id: any;

    @ApiProperty({ example: 12000, description: 'Warehouse quantity' })
    @Column({ type: 'int', default: null })
    quantity: number;

    @ApiProperty({ example: 12000, description: 'Warehouse price' })
    @Column({ type: 'int', default: null })
    price: number;
  
    @ApiProperty({ example: 12000, description: 'Warehouse quantity' })
    @Column({ type: 'int', default: 1 })
    status: number;
    
    @ApiProperty({ example: 'Uzb', description: 'Warehouse manufacturer country' })
    @Column({ type: 'text', default: null })
    manufacture_country: string;

    @ApiProperty({ example: "Cotton polister", description: 'Warehouse material composition' })
    @Column({ type: 'text', default: null })
    material_composition: string;

    @ApiProperty({ example: ["images"], description: 'Product images links' })
    @Column('text', { array: true })
    images: string[];
  
    @ApiProperty({ example: 'Made in Uzbekistan', description: 'Product description' })
    @Column({ type: 'text', default: null })
    description: string;
  
    @ApiProperty({ example: 12000, description: 'Warehouse quantity' })
    @Column({ type: 'int', default: 0 })
    type: number;

    @ApiProperty({ example: 'cklsjilkemd.jpg', description: 'Warehouse image front' })
    @Column({ type: 'text', default: null })
    image_front: string;
  
    @ApiProperty({ example: 'cklsjilkemd.jpg', description: 'Warehouse image back' })
    @Column({ type: 'text', default: null })
    image_back: string;

    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}