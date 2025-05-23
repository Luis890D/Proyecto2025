import { AppDataSource } from "../config/db";
import { Asistente } from "../entities/asistente";
import { Usuario } from "../entities/usuarios";

const asistenteRepository = AppDataSource.getRepository(Asistente);
const usuarioRepository = AppDataSource.getRepository(Usuario);

export const srvGetAsistentes = async () => {
    return await asistenteRepository.find({
        relations: ['usuario'],
        order: { idAsistente: 'ASC' }
    });
}

export const srvGetAsistenteByID = async (idAsistente: number) => {
    return await asistenteRepository.findOne({
        where: { idAsistente },
        relations: ['usuario']
    });
}

export const srvGetAsistenteByUsuario = async (idUsuario: number) => {
    return await asistenteRepository.findOne({
        where: { idUsuario },
        relations: ['usuario']
    });
}

export const srvCreateAsistente = async (asistenteData: {
    idUsuario: number;
    telefono?: string;
    fechaContratacion?: Date;
}) => {
    try {
        // Verificar primero si el usuario existe
        const usuarioExistente = await usuarioRepository.findOne({
            where: { idUsuario: asistenteData.idUsuario }
        });

        if (!usuarioExistente) {
            throw new Error(`El usuario con ID ${asistenteData.idUsuario} no existe`);
        }

        // Verificar si el usuario tiene rol de asistente
        if (usuarioExistente.rol !== 'asistente') {
            throw new Error(`El usuario con ID ${asistenteData.idUsuario} no tiene rol de asistente`);
        }

        // Verificar si ya existe un asistente para este usuario
        const asistenteExistente = await asistenteRepository.findOne({
            where: { idUsuario: asistenteData.idUsuario }
        });

        if (asistenteExistente) {
            throw new Error(`Ya existe un asistente para el usuario con ID ${asistenteData.idUsuario}`);
        }

        const nuevoAsistente = new Asistente();
        Object.assign(nuevoAsistente, asistenteData);

        return await asistenteRepository.save(nuevoAsistente);
    } catch (error) {
        console.error('Error en srvCreateAsistente:', error);
        throw error;
    }
}

export const srvUpdateAsistente = async (idAsistente: number, updateData: Partial<Asistente>) => {
    const asistente = await asistenteRepository.findOne({ where: { idAsistente } });
    if (!asistente) return null;
    Object.assign(asistente, updateData);
    return await asistenteRepository.save(asistente);
}

export const srvDeleteAsistente = async (idAsistente: number) => {
    const asistente = await asistenteRepository.findOne({ where: { idAsistente } });
    if (!asistente) return null;
    return await asistenteRepository.remove(asistente);
}