import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  cliente_id: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "DPI" })
  user: User;

  @Column({ default: true })
  estado_cliente: boolean;
}
