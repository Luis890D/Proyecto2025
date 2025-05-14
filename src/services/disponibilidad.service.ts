import { AppDataSource } from "../config/db";
import { Disponibilidad } from "../entities/disponibilidad";

const disponibilidadRepository = AppDataSource.getRepository(Disponibilidad);

export const srvGetDisponibilidades = async (idProfesional: number) => {
    return await disponibilidadRepository.find({
        where: { idProfesional },
        order: { fecha: 'ASC', horaInicio: 'ASC' }
    });
}

export const srvGetDisponibilidadByID = async (idDisponibilidad: number) => {
    return await disponibilidadRepository.findOne({
        where: { idDisponibilidad }
    });
}

export const srvCreateDisponibilidad = async (disponibilidadData: {
    idProfesional: number;
    fecha: Date;
    horaInicio: string;
    horaFin: string;
    disponible?: boolean;
}) => {
    const nuevaDisponibilidad = new Disponibilidad();
    Object.assign(nuevaDisponibilidad, {
        ...disponibilidadData,
        disponible: disponibilidadData.disponible ?? true
    });
    return await disponibilidadRepository.save(nuevaDisponibilidad);
}

export const srvUpdateDisponibilidad = async (idDisponibilidad: number, updateData: Partial<Disponibilidad>) => {
    const disponibilidad = await disponibilidadRepository.findOne({ where: { idDisponibilidad } });
    if (!disponibilidad) return null;
    Object.assign(disponibilidad, updateData);
    return await disponibilidadRepository.save(disponibilidad);
}

export const srvDeleteDisponibilidad = async (idDisponibilidad: number) => {
    const disponibilidad = await disponibilidadRepository.findOne({ where: { idDisponibilidad } });
    if (!disponibilidad) return null;
    return await disponibilidadRepository.remove(disponibilidad);
}