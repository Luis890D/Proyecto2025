import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Especialidad {
  @PrimaryGeneratedColumn()
  Especialidad_id: number;

  @Column()
  description: string;

  @Column({ default: true })
  estado_especialidad: boolean;
}
