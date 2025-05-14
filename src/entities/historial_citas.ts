import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Cita } from "./cita";
import { Usuario } from "./usuarios";

@Entity({ name: 'historial_citas' })
export class HistorialCita {
    @PrimaryGeneratedColumn({ name: 'id_historial' })
    idHistorial: number;

    @Column({ name: 'id_cita' })
    idCita: number;

    @ManyToOne(() => Cita, cita => cita.historiales)
    @JoinColumn({ name: 'id_cita' })
    cita: Cita;

    @Column({ name: 'tipo_cambio', length: 50, nullable: false })
    tipoCambio: string;

    @Column({ name: 'fecha_cambio', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCambio: Date;

    @Column({ name: 'id_usuario' })
    idUsuario: number;

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;

    @Column({ name: 'detalles', type: 'text', nullable: true })
    detalles: string;
}