import { AppDataSource } from "../config/db";
import { Paciente } from "../entities/paciente";

const pacienteRepository = AppDataSource.getRepository(Paciente);

export const srvGetPacientes = async () => {
    return await pacienteRepository.find({
        order: { nombre: 'ASC' }
    });
}

export const srvGetPacienteByID = async (idPaciente: number) => {
    return await pacienteRepository.findOne({
        where: { idPaciente }
    });
}

export const srvGetPacienteByDPI = async (dpi: string) => {
    return await pacienteRepository.findOne({
        where: { dpi }
    });
}

export const srvCreatePaciente = async (pacienteData: {
    dpi: string;
    nombre: string;
    apellido: string;
    fechaNacimiento?: Date;
    genero?: string;
    telefono?: string;
    email?: string;
    direccion?: string;
    alergias?: string;
    antecedentes?: string;
}) => {
    const nuevoPaciente = new Paciente();
    Object.assign(nuevoPaciente, pacienteData);
    return await pacienteRepository.save(nuevoPaciente);
}

export const srvUpdatePaciente = async (idPaciente: number, updateData: Partial<Paciente>) => {
    const paciente = await pacienteRepository.findOne({ where: { idPaciente } });
    if (!paciente) return null;
    Object.assign(paciente, updateData);
    return await pacienteRepository.save(paciente);
}

export const srvDeletePaciente = async (idPaciente: number) => {
    const paciente = await pacienteRepository.findOne({ where: { idPaciente } });
    if (!paciente) return null;
    return await pacienteRepository.remove(paciente);
}