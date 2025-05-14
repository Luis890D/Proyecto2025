import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Cita } from "./cita";

@Entity({ name: 'expedientes' })
export class Expediente {
    @PrimaryGeneratedColumn({ name: 'id_expediente' })
    idExpediente: number;

    @Column({ name: 'id_cita', unique: true })
    idCita: number;

    @OneToOne(() => Cita)
    @JoinColumn({ name: 'id_cita' })
    cita: Cita;

    @Column({ name: 'sintomas_diagnostico', type: 'text', nullable: true })
    sintomasDiagnostico: string;

    @Column({ name: 'recomendaciones_medicamentos', type: 'text', nullable: true })
    recomendacionesMedicamentos: string;

    @Column({ name: 'examenes_practicados', type: 'text', nullable: true })
    examenesPracticados: string;

    @Column({ name: 'examenes_pendientes', type: 'text', nullable: true })
    examenesPendientes: string;

    @Column({ name: 'notas', type: 'text', nullable: true })
    notas: string;

    @Column({ name: 'fecha_creacion', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaCreacion: Date;
}