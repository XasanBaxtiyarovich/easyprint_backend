import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('company')
export class Company {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'Easygo', description: 'Company name' })
  @Column({ type: 'text', default: null })
  name: string;

  @ApiProperty({ example: 30000, description: 'Company delivery price' })
  @Column({ default: null })
  delivery_price: number;

  @ApiProperty({ example: true, description: 'Company print' })
  @Column({ default: false })
  print: boolean;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}