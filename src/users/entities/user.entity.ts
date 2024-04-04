import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Role } from "src/role/entities";
import { PersonalInfo } from "src/personal_infos/entities";

@Entity('users')
export class Users {
  @ApiProperty({ example: 1, description: 'Unique ID' })
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'email@example.com', description: 'User email address' })
  @Column({ type: 'text' })
  email: string;

  @ApiProperty({ example: 'cjkdm,ssfds', description: 'User token' })
  @Column({ type: 'text', default: "" })
  token: string;

  @ApiProperty({ example: '+998881758881', description: 'User phone number' })
  @Column({ type: 'text', default: null })
  phone_number: string;

  @ApiProperty({ example: 'dcsdcmkre', description: 'User hashed password' })
  @Column({ type: 'text' })
  password: string;

  @ApiProperty({ example: '+998881758881', description: 'User phone number' })
  @Column({ type: 'text', default: 'ru' })
  language: string;

  @ApiProperty({ example: 2, description: 'Company primary key id'})
  @Column({  nullable: true, default: null })
  company_id: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToOne(() => PersonalInfo, (personal_info) => personal_info.users)
  personal_info: PersonalInfo;
}