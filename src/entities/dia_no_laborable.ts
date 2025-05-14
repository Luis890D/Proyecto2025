import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Profesional } from "./profesional";

@Entity({ name: 'dias_no_laborables' })
export class DiaNoLaborable {
    @PrimaryGeneratedColumn({ name: 'id_dia_no_laborable' })
    idDiaNoLaborable: number;

    @Column({ name: 'id_profesional' })
    idProfesional: number;

    @ManyToOne(() => Profesional, profesional => profesional.diasNoLaborables)
    @JoinColumn({ name: 'id_profesional' })
    profesional: Profesional;

    @Column({ name: 'fecha', type: 'date', nullable: false })
    fecha: Date;

    @Column({ name: 'motivo', length: 255, nullable: true })
    motivo: string;
}