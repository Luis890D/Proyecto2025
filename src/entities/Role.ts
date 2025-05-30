import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User";

@Entity({ name: 'Role' })
export class Role {
    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId: number;

    @Column({ name: 'description', nullable: false })
    description: string;

    @Column({ name: 'estado_role', default: true })
    estadoRole: boolean;

    @OneToMany(() => User, user => user.role)
    users: User[];
}