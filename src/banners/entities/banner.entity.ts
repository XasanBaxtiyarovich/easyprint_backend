import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('banners')
export class Banner {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @ApiProperty({ example: 'title', description: 'Banner title' })
    @Column({ type: 'text' })
    title: string;
  
    @ApiProperty({ example: 'text', description: 'Banner text' })
    @Column({ type: 'text' })
    text: string;

    @ApiProperty({ example: ["images"], description: 'Product images links' })
    @Column('text', { array: true })
    images: string[];
  
    @ApiProperty({ example: true, description: 'Product status' })
    @Column({ default: 0 })
    is_active: number;
  
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}