import { AppDataSource } from "../config/db";
import { Profesional } from "../entities/profesional";

const profesionalRepository = AppDataSource.getRepository(Profesional);

export const srvGetProfesionales = async () => {
    return await profesionalRepository.find({
        relations: ['usuario'],
        order: { idProfesional: 'ASC' }
    });
}

export const srvGetProfesionalByID = async (idProfesional: number) => {
    return await profesionalRepository.findOne({
        where: { idProfesional },
        relations: ['usuario']
    });
}

export const srvCreateProfesional = async (profesionalData: {
    idUsuario: number;
    especialidad: string;
    consultorio: string;
    telefono?: string;
    biografia?: string;
}) => {
    const nuevoProfesional = new Profesional();
    Object.assign(nuevoProfesional, profesionalData);
    return await profesionalRepository.save(nuevoProfesional);
}

export const srvUpdateProfesional = async (idProfesional: number, updateData: Partial<Profesional>) => {
    const profesional = await profesionalRepository.findOne({ where: { idProfesional } });
    if (!profesional) return null;
    Object.assign(profesional, updateData);
    return await profesionalRepository.save(profesional);
}

export const srvDeleteProfesional = async (idProfesional: number) => {
    const profesional = await profesionalRepository.findOne({ where: { idProfesional } });
    if (!profesional) return null;
    return await profesionalRepository.remove(profesional);
}