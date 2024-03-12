import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class Product {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @ApiProperty({ example: 'Futbolka', description: 'Product name' })
    @Column({ type: 'text', default: null })
    name: string;
  
    @ApiProperty({ example: 1, description: 'Product category' })
    @Column({ default: null })
    category_id: number;

    @ApiProperty({ example: ["images"], description: 'Product images links' })
    @Column('text', { array: true })
    images: string[];
  
    @ApiProperty({ example: 0, description: 'Product status' })
    @Column({ default: 0 })
    status: number;
  
    @ApiProperty({ example: 'Uzb', description: 'Product manufacturer country' })
    @Column({ type: 'text', default: null })
    manufacturer_country: string;
  
    @ApiProperty({ example: "Cotton polister", description: 'Product material composition' })
    @Column({ type: 'text', default: null })
    material_composition: string;
  
    @ApiProperty({ example: 0, description: 'Product price' })
    @Column({ default: 0 })
    price: number;
  
    @ApiProperty({ example: 'Made in Uzbekistan', description: 'Product description' })
    @Column({ type: 'text', default: null })
    description: string;
  
    @ApiProperty({ example: 0, description: 'Product slide show' })
    @Column({ default: 0 })
    slide_show: number;
  
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;
}