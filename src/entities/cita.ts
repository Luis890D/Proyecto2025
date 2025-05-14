import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Paciente } from "./paciente";
import { Profesional } from "./profesional";
import { Asistente } from "./asistente";
import { Expediente } from "./expediente";
import { HistorialCita } from "./historial_citas";

@Entity({ name: 'citas' })
export class Cita {
    @PrimaryGeneratedColumn({ name: 'id_cita' })
    idCita: number;

    @Column({ name: 'id_paciente' })
    idPaciente: number;

    @ManyToOne(() => Paciente, paciente => paciente.citas)
    @JoinColumn({ name: 'id_paciente' })
    paciente: Paciente;

    @Column({ name: 'id_profesional' })
    idProfesional: number;

    @ManyToOne(() => Profesional, profesional => profesional.citas)
    @JoinColumn({ name: 'id_profesional' })
    profesional: Profesional;

    @Column({ name: 'id_asistente', nullable: true })
    idAsistente: number;

    @ManyToOne(() => Asistente, asistente => asistente.citas)
    @JoinColumn({ name: 'id_asistente' })
    asistente: Asistente;

    @Column({ name: 'fecha', type: 'date', nullable: false })
    fecha: Date;

    @Column({ name: 'hora', type: 'time', nullable: false })
    hora: string;

    @Column({ 
        name: 'estado', 
        length: 20, 
        default: 'programada',
        enum: ['programada', 'completada', 'cancelada', 'reprogramada']
    })
    estado: 'programada' | 'completada' | 'cancelada' | 'reprogramada';

    @Column({ name: 'motivo_consulta', type: 'text', nullable: true })
    motivoConsulta: string;

    @Column({ name: 'fecha_registro', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    fechaRegistro: Date;

    @OneToOne(() => Expediente, expediente => expediente.cita)
    expediente: Expediente;

    @OneToMany(() => HistorialCita, historial => historial.cita)
    historiales: HistorialCita[];
}