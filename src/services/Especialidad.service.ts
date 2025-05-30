import { AppDataSource } from "../config/db";
import { Especialidad } from "../entities/Especialidad";

const especialidadRepository = AppDataSource.getRepository(Especialidad);

// Obtener todas las especialidades
export const srvGetEspecialidades = async () => {
    const especialidades = await especialidadRepository.find({
        order: { description: 'ASC' }
    });
    return especialidades;
}

// Crear una nueva especialidad
export const srvCreateEspecialidad = async (description: string) => {
    const newEspecialidad = new Especialidad();
    newEspecialidad.description = description;

    return await especialidadRepository.save(newEspecialidad);
}

// Obtener una especialidad por ID
export const srvGetEspecialidadByID = async (pIdEspecialidad: number) => {
    const especialidad = await especialidadRepository.findOne({
        where: { Especialidad_id: pIdEspecialidad }
    });
    return especialidad;
}

// Actualizar especialidad
export const srvUpdateEspecialidad = async (
    pIdEspecialidad: number,
    description: string,
    estado_especialidad: boolean
) => {
    const especialidad = await especialidadRepository.findOne({
        where: { Especialidad_id: pIdEspecialidad }
    });

    if (!especialidad) return null;

    especialidad.description = description;
    especialidad.estado_especialidad = estado_especialidad;

    return await especialidadRepository.save(especialidad);
}

// Eliminar especialidad (cambio de estado)
export const srvDeleteEspecialidad = async (pIdEspecialidad: number) => {
    const especialidad = await especialidadRepository.findOne({
        where: { Especialidad_id: pIdEspecialidad }
    });

    if (!especialidad) return null;

    especialidad.estado_especialidad = false;
    return await especialidadRepository.save(especialidad);
}