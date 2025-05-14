import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from "typeorm";
import { Usuario } from "./usuarios";
import { Cita } from "./cita";

@Entity({ name: 'asistentes' })
export class Asistente {
    @PrimaryGeneratedColumn({ name: 'id_asistente' })
    idAsistente: number;

    @Column({ name: 'id_usuario', unique: true })
    idUsuario: number;

    @OneToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @Column({ name: 'telefono', length: 20, nullable: true })
    telefono: string;

    @Column({ name: 'fecha_contratacion', type: 'date', nullable: true })
    fechaContratacion: Date;

    @OneToMany(() => Cita, cita => cita.asistente)
    citas: Cita[];
}