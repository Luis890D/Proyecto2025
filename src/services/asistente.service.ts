import { AppDataSource } from "../config/db";
import { Asistente } from "../entities/asistente";

const asistenteRepository = AppDataSource.getRepository(Asistente);

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

export const srvCreateAsistente = async (asistenteData: {
    idUsuario: number;
    telefono?: string;
    fechaContratacion?: Date;
}) => {
    const nuevoAsistente = new Asistente();
    Object.assign(nuevoAsistente, asistenteData);
    return await asistenteRepository.save(nuevoAsistente);
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