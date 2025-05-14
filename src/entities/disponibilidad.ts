import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Profesional } from "./profesional";

@Entity({ name: 'disponibilidad' })
export class Disponibilidad {
    @PrimaryGeneratedColumn({ name: 'id_disponibilidad' })
    idDisponibilidad: number;

    @Column({ name: 'id_profesional' })
    idProfesional: number;

    @ManyToOne(() => Profesional, profesional => profesional.disponibilidades)
    @JoinColumn({ name: 'id_profesional' })
    profesional: Profesional;

    @Column({ name: 'fecha', type: 'date', nullable: false })
    fecha: Date;

    @Column({ name: 'hora_inicio', type: 'time', nullable: false })
    horaInicio: string;

    @Column({ name: 'hora_fin', type: 'time', nullable: false })
    horaFin: string;

    @Column({ name: 'disponible', type: 'boolean', default: true })
    disponible: boolean;
}