import { AppDataSource } from "../config/db";
import { Between } from "typeorm";
import { Cita } from "../entities/cita";

export const srvGetReporteCitas = async (fechaInicio: Date, fechaFin: Date) => {
    return await AppDataSource.getRepository(Cita).createQueryBuilder('cita')
        .select(['COUNT(*) as total', 'estado'])
        .where('cita.fecha BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
        .groupBy('estado')
        .getRawMany();
}

export const srvGetReporteProfesionales = async (fechaInicio: Date, fechaFin: Date) => {
    return await AppDataSource.getRepository(Cita)
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.profesional', 'profesional')
        .select([
            'profesional.id_profesional as idProfesional',
            'profesional.especialidad as especialidad',
            'COUNT(cita.id_cita) as totalCitas'
        ])
        .where('cita.fecha BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
        .andWhere('cita.estado = :estado', { estado: 'completada' })
        .groupBy('profesional.id_profesional, profesional.especialidad')
        .orderBy('totalCitas', 'DESC')
        .getRawMany();
}

export const srvGetReportePacientes = async (fechaInicio: Date, fechaFin: Date) => {
    return await AppDataSource.getRepository(Cita)
        .createQueryBuilder('cita')
        .leftJoinAndSelect('cita.paciente', 'paciente')
        .select([
            'paciente.id_paciente as idPaciente',
            'CONCAT(paciente.nombre, \' \', paciente.apellido) as nombrePaciente',
            'COUNT(cita.id_cita) as totalCitas'
        ])
        .where('cita.fecha BETWEEN :fechaInicio AND :fechaFin', { fechaInicio, fechaFin })
        .groupBy('paciente.id_paciente, paciente.nombre, paciente.apellido')
        .orderBy('totalCitas', 'DESC')
        .getRawMany();
}