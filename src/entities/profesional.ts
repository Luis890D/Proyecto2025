import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from "./usuarios";
import { Disponibilidad } from "./disponibilidad";
import { DiaNoLaborable } from "./dia_no_laborable";
import { Cita } from "./cita";

@Entity({ name: 'profesionales' })
export class Profesional {
    @PrimaryGeneratedColumn({ name: 'id_profesional' })
    idProfesional: number;

    @Column({ name: 'id_usuario', unique: true })
    idUsuario: number;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @Column({ name: 'especialidad', length: 100, nullable: false })
    especialidad: string;

    @Column({ name: 'consultorio', length: 20, nullable: false })
    consultorio: string;

    @Column({ name: 'telefono', length: 20, nullable: true })
    telefono: string;

    @Column({ name: 'biografia', type: 'text', nullable: true })
    biografia: string;

    @OneToMany(() => Disponibilidad, disponibilidad => disponibilidad.profesional)
    disponibilidades: Disponibilidad[];

    @OneToMany(() => DiaNoLaborable, diaNoLaborable => diaNoLaborable.profesional)
    diasNoLaborables: DiaNoLaborable[];

    @OneToMany(() => Cita, cita => cita.profesional)
    citas: Cita[];
}