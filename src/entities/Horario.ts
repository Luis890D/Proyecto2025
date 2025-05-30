import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Profesional } from "./Profesional";

export enum TipoHorario {
  LABORAL = "laboral",
  NO_LABORAL = "no_laboral"
}

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  horario_id: number;

  @ManyToOne(() => Profesional)
  @JoinColumn({ name: "profesional_id" })
  profesional: Profesional;

  @Column({ type: "date" })
  fecha: string;

  @Column({ type: "timestamp" })
  hora_inicio: Date;

  @Column({ type: "timestamp" })
  hora_finalizacion: Date;

  @Column({
    type: "enum",
    enum: TipoHorario
  })
  tipo: TipoHorario;
}
