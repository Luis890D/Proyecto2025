import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Consultorio {
  @PrimaryGeneratedColumn()
  consultorio_id: number;

  @Column()
  direccion: string;

  @Column()
  telefono: string;

  @Column({ default: true })
  estado_consultorio: boolean;
}
