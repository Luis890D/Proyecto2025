import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profesional } from "./profesional";
import { Asistente } from "./asistente";

@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    idUsuario: number;

    @Column({ name: 'nombre', length: 100, nullable: false })
    nombre: string;

    @Column({ name: 'email', length: 100, unique: true, nullable: false })
    email: string;

    @Column({ name: 'password', length: 255, nullable: false })
    password: string;

    @Column({ name: 'rol', length: 20, nullable: false })
    rol: 'profesional' | 'asistente';

    @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @Column({ name: 'activo', type: 'boolean', default: true })
    activo: boolean;

    @OneToOne(() => Profesional, profesional => profesional.usuario)
    profesional: Profesional;

    @OneToOne(() => Asistente, asistente => asistente.usuario)
    asistente: Asistente;
}