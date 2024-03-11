import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('category')
export class Category {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Easygo', description: 'Category name' })
  @Column({ type: 'text', default: null })
  name: string;

  @ApiProperty({ example: 0, description: 'Category parent id' })
  @Column({ default: null })
  parent_id: number;

  @ApiProperty({ example: 0, description: 'Category parent id step' })
  @Column({ default: 0 })
  step: number;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}