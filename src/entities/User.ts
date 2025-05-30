import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  DPI: number;

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column()
  primer_nombre: string;

  @Column({ nullable: true })
  segundo_nombre: string;

  @Column()
  primer_apellido: string;

  @Column({ nullable: true })
  segundo_apellido: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  celular: string;

  @Column({ default: true })
  estado_user: boolean;
}
