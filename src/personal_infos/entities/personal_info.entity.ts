import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/entities";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('personal_infos')
export class PersonalInfo {
    @ApiProperty({ example: 1, description: 'Unique ID' })
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @ApiProperty({ example: 'John', description: 'User first name' })
    @Column({ type: 'text', default: null })
    first_name: string;
  
    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @Column({ type: 'text', default: null })
    last_name: string;

    @ApiProperty({ example: 'Doe', description: 'User last name' })
    @Column({ type: 'text', default: null })
    middle_name: string;

    @ApiProperty({ example: '+998881758881', description: 'User phone number' })
    @Column({ type: 'text', default: null })
    phone_number: string;

    @ApiProperty({ example: 'cjkdm.jpg', description: 'User avatar link' })
    @Column({ type: 'text' })
    avatar: string;
  
    @ApiProperty({ example: 1, description: 'User gender 1-men, 2-women' })
    @Column({ type: 'int' })
    gender: number;
  
    @ApiProperty({ example: '12.02.2023', description: 'User birthday date' })
    @Column()
    birth_date: string;

    @ApiProperty({ example: 'email@example.com', description: 'User email address' })
    @Column({ type: 'text' })
    email: string;

    @OneToMany(() => Users, (user) => user.personal_info)
    users: Users[];
}