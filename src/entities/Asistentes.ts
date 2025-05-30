import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Asistente {
  @PrimaryGeneratedColumn()
  asistente_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "DPI" })
  user: User;

  @Column()
  nombre_user: string;

  @Column()
  password: string;

  @Column({ default: true })
  estado_asistente: boolean;
}
