import { AppDataSource } from "../config/db";
import { Expediente } from "../entities/expediente";
import { Cita } from "../entities/cita";

const expedienteRepository = AppDataSource.getRepository(Expediente);
const citaRepository = AppDataSource.getRepository(Cita);

export const srvGetExpedienteByCita = async (idCita: number) => {
    return await expedienteRepository.findOne({
        where: { idCita },
        relations: ['cita']
    });
}

export const srvCreateExpediente = async (expedienteData: {
    idCita: number;
    sintomasDiagnostico?: string;
    recomendacionesMedicamentos?: string;
    examenesPracticados?: string;
    examenesPendientes?: string;
    notas?: string;
}) => {
    const cita = await citaRepository.findOne({ where: { idCita: expedienteData.idCita } });
    if (!cita) throw new Error('Cita no encontrada');

    const nuevoExpediente = new Expediente();
    Object.assign(nuevoExpediente, expedienteData);
    return await expedienteRepository.save(nuevoExpediente);
}

export const srvUpdateExpediente = async (idExpediente: number, updateData: Partial<Expediente>) => {
    const expediente = await expedienteRepository.findOne({ where: { idExpediente } });
    if (!expediente) return null;
    Object.assign(expediente, updateData);
    return await expedienteRepository.save(expediente);
}

export const srvGetHistorialMedico = async (idPaciente: number) => {
    return await expedienteRepository.createQueryBuilder('expediente')
        .leftJoinAndSelect('expediente.cita', 'cita')
        .where('cita.idPaciente = :idPaciente', { idPaciente })
        .orderBy('cita.fecha', 'DESC')
        .addOrderBy('cita.hora', 'DESC')
        .getMany();
}