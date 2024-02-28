import { ApiProperty } from "@nestjs/swagger";
import { Users } from "src/users/entities";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('role')
export class Role{
    @ApiProperty({ example: 1, description: "Unique ID" })
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ApiProperty({ example: "admin", description: "Role name" })
    @Column({ type: 'text' })
    name: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Users, (user) => user.role)
    users: Users[];
}