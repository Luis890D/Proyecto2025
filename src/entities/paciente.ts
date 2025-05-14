import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Cita } from "./cita";

@Entity({ name: 'pacientes' })
export class Paciente {
    @PrimaryGeneratedColumn({ name: 'id_paciente' })
    idPaciente: number;

    @Column({ name: 'dpi', length: 20, unique: true, nullable: false })
    dpi: string;

    @Column({ name: 'nombre', length: 100, nullable: false })
    nombre: string;

    @Column({ name: 'apellido', length: 100, nullable: false })
    apellido: string;

    @Column({ name: 'fecha_nacimiento', type: 'date', nullable: true })
    fechaNacimiento: Date;

    @Column({ name: 'genero', length: 20, nullable: true })
    genero: string;

    @Column({ name: 'telefono', length: 20, nullable: true })
    telefono: string;

    @Column({ name: 'email', length: 100, nullable: true })
    email: string;

    @Column({ name: 'direccion', type: 'text', nullable: true })
    direccion: string;

    @Column({ name: 'alergias', type: 'text', nullable: true })
    alergias: string;

    @Column({ name: 'antecedentes', type: 'text', nullable: true })
    antecedentes: string;

    @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @OneToMany(() => Cita, cita => cita.paciente)
    citas: Cita[];
}