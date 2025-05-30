import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
export class Expediente {
  @PrimaryGeneratedColumn()
  expediente_id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @Column({ nullable: true })
  sintomas_diagnostico: string;

  @Column({ nullable: true })
  recomendaciones: string;

  @Column({ nullable: true })
  medicamentos: string;

  @Column({ nullable: true })
  examenes: string;

  @Column({ default: 1 })
  expediente_estado: number;
}
