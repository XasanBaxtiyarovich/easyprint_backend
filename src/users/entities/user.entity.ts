import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { Role } from "src/role/entities";

@Entity('users')
export class Users {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @Column({ type: 'text', default: null })
  firstname: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @Column({ type: 'text', default: null })
  lastname: string;

  @ApiProperty({ example: 'email@example.com', description: 'User email address' })
  @Column({ type: 'text' })
  email: string;

  @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
  @Column({ type: 'text' })
  hashed_password: string;

  @ApiProperty({ example: true, description: 'User active' })
  @Column({ default: true })
  is_active: boolean;

  @ApiProperty({ example: 'cjkdm,ssfds', description: 'User avatar link' })
  @Column({ type: 'text' })
  image: string;

  @ApiProperty({ example: 'cjkdm,ssfds', description: 'User token' })
  @Column({ type: 'text', default: "" })
  token: string;

  @ApiProperty({ example: 2, description: 'Company primary key id'})
  @Column({ type: 'int', default: null })
  company_id: number

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}