import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Consultorio } from "./Consultorio";
import { Especialidad } from "./Especialidad";

@Entity()
export class Profesional {
  @PrimaryGeneratedColumn()
  profesional_id: number;

  @Column({ name: "DPI" }) // Added explicit column definition for DPI
  DPI: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "DPI" })
  user: User;

  @Column()
  nombre_user: string;

  @Column()
  password: string;

  @ManyToOne(() => Consultorio)
  @JoinColumn({ name: "consultorio_id" })
  consultorio: Consultorio;

  @ManyToOne(() => Especialidad)
  @JoinColumn({ name: "especialidad_id" })
  especialidad: Especialidad;

  @Column({ default: true })
  estado_profesional: boolean;
}
