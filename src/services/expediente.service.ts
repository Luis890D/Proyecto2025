import { AppDataSource } from "../config/db";
import { Expediente } from "../entities/Expediente";
import { Cliente } from "../entities/Cliente";

// Repositorio
const expedienteRepository = AppDataSource.getRepository(Expediente);

// Obtener todos los expedientes
export const srvGetExpedientes = async () => {
  return await expedienteRepository.find({
    relations: ["cliente"],
    order: { expediente_id: "DESC" }
  });
};

// Crear un nuevo expediente
export const srvCreateExpediente = async (
  cliente: Cliente,
  sintomas_diagnostico: string,
  recomendaciones: string,
  medicamentos: string,
  examenes: string
) => {
  const expediente = new Expediente();
  expediente.cliente = cliente;
  expediente.sintomas_diagnostico = sintomas_diagnostico;
  expediente.recomendaciones = recomendaciones;
  expediente.medicamentos = medicamentos;
  expediente.examenes = examenes;

  return await expedienteRepository.save(expediente);
};

// Obtener un expediente por ID
export const srvGetExpedienteById = async (id: number) => {
  return await expedienteRepository.findOne({
    where: { expediente_id: id },
    relations: ["cliente"]
  });
};

// Actualizar un expediente
export const srvUpdateExpediente = async (
  id: number,
  sintomas_diagnostico: string,
  recomendaciones: string,
  medicamentos: string,
  examenes: string,
  expediente_estado: number
) => {
  const expediente = await expedienteRepository.findOneBy({ expediente_id: id });
  if (!expediente) return null;

  expediente.sintomas_diagnostico = sintomas_diagnostico;
  expediente.recomendaciones = recomendaciones;
  expediente.medicamentos = medicamentos;
  expediente.examenes = examenes;

  if (expediente_estado !== undefined) {
    expediente.expediente_estado = expediente_estado;
  }

  return await expedienteRepository.save(expediente);
};

// Eliminar un expediente
export const srvDeleteExpediente = async (id: number) => {
  const expediente = await expedienteRepository.findOneBy({ expediente_id: id });
  if (!expediente) return null;

  return await expedienteRepository.remove(expediente);
};
