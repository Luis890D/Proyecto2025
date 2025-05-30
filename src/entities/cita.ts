import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Profesional } from "./Profesional";
import { Asistente } from "./Asistentes";

@Entity()
export class Cita {
  @PrimaryGeneratedColumn()
  cita_id: number;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: "cliente_id" })
  cliente: Cliente;

  @ManyToOne(() => Profesional)
  @JoinColumn({ name: "profesional_id" })
  profesional: Profesional;

  @ManyToOne(() => Asistente)
  @JoinColumn({ name: "asistente_id" })
  asistente: Asistente;

  @Column({ type: "timestamp" })
  fecha_inicio: Date;

  @Column({ type: "timestamp" })
  fecha_finalizacion: Date;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  observaciones: string;

  @Column({ default: 1 })
  cita_estado: number;
}
