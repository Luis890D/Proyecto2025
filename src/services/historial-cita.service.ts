import { AppDataSource } from "../config/db";
import { HistorialCita } from "../entities/historial_citas";

const historialRepository = AppDataSource.getRepository(HistorialCita);

export const srvGetHistorialByCita = async (idCita: number) => {
    return await historialRepository.find({
        where: { idCita },
        relations: ['usuario'],
        order: { fechaCambio: 'DESC' }
    });
}

export const srvCreateRegistroHistorial = async (historialData: {
    idCita: number;
    idUsuario: number;
    tipoCambio: string;
    detalles?: string;
}) => {
    const nuevoRegistro = new HistorialCita();
    Object.assign(nuevoRegistro, historialData);
    return await historialRepository.save(nuevoRegistro);
}