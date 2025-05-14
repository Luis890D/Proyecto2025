import { AppDataSource } from "../config/db";
import { Cita } from "../entities/cita";

const citaRepository = AppDataSource.getRepository(Cita);

export const srvGetCitas = async () => {
    return await citaRepository.find({
        relations: ['paciente', 'profesional', 'asistente'],
        order: { fecha: 'DESC', hora: 'DESC' }
    });
}

export const srvGetCitaByID = async (idCita: number) => {
    return await citaRepository.findOne({
        where: { idCita },
        relations: ['paciente', 'profesional', 'asistente']
    });
}

export const srvGetCitasByPaciente = async (idPaciente: number) => {
    return await citaRepository.find({
        where: { idPaciente },
        relations: ['profesional'],
        order: { fecha: 'DESC', hora: 'DESC' }
    });
}

export const srvGetCitasByProfesional = async (idProfesional: number) => {
    return await citaRepository.find({
        where: { idProfesional },
        relations: ['paciente'],
        order: { fecha: 'ASC', hora: 'ASC' }
    });
}

export const srvCreateCita = async (citaData: {
    idPaciente: number;
    idProfesional: number;
    idAsistente?: number;
    fecha: Date;
    hora: string;
    motivoConsulta?: string;
}) => {
    const nuevaCita = new Cita();
    Object.assign(nuevaCita, citaData);
    return await citaRepository.save(nuevaCita);
}

export const srvUpdateCita = async (idCita: number, updateData: Partial<Cita>) => {
    const cita = await citaRepository.findOne({ where: { idCita } });
    if (!cita) return null;
    Object.assign(cita, updateData);
    return await citaRepository.save(cita);
}

export const srvUpdateEstadoCita = async (idCita: number, estado: 'programada' | 'completada' | 'cancelada' | 'reprogramada') => {
    const cita = await citaRepository.findOne({ where: { idCita } });
    if (!cita) return null;
    cita.estado = estado;
    return await citaRepository.save(cita);
}

export const srvDeleteCita = async (idCita: number) => {
    const cita = await citaRepository.findOne({ where: { idCita } });
    if (!cita) return null;
    return await citaRepository.remove(cita);
}