import { AppDataSource } from "../config/db";
import { Consultorio } from "../entities/Consultorio";

const consultorioRepository = AppDataSource.getRepository(Consultorio);

// Obtener todos los consultorios
export const srvGetConsultorios = async () => {
    const consultorios = await consultorioRepository.find({
        order: { direccion: 'ASC' }
    });
    return consultorios;
}

// Crear un nuevo consultorio
export const srvCreateConsultorio = async (
    direccion: string,
    telefono: string
) => {
    const newConsultorio = new Consultorio();
    newConsultorio.direccion = direccion;
    newConsultorio.telefono = telefono;

    return await consultorioRepository.save(newConsultorio);
}

// Obtener un consultorio por ID
export const srvGetConsultorioByID = async (pIdConsultorio: number) => {
    const consultorio = await consultorioRepository.findOne({
        where: { consultorio_id: pIdConsultorio }
    });
    return consultorio;
}

// Actualizar consultorio
export const srvUpdateConsultorio = async (
    pIdConsultorio: number,
    direccion: string,
    telefono: string,
    estado_consultorio: boolean
) => {
    const consultorio = await consultorioRepository.findOne({
        where: { consultorio_id: pIdConsultorio }
    });

    if (!consultorio) return null;

    consultorio.direccion = direccion;
    consultorio.telefono = telefono;
    consultorio.estado_consultorio = estado_consultorio;

    return await consultorioRepository.save(consultorio);
}

// Eliminar consultorio (cambio de estado)
export const srvDeleteConsultorio = async (pIdConsultorio: number) => {
    const consultorio = await consultorioRepository.findOne({
        where: { consultorio_id: pIdConsultorio }
    });

    if (!consultorio) return null;

    consultorio.estado_consultorio = false;
    return await consultorioRepository.save(consultorio);
}