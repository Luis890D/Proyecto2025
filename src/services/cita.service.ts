import { AppDataSource } from "../config/db";
import { Cita } from "../entities/Cita";
import { Cliente } from "../entities/Cliente";
import { Profesional } from "../entities/Profesional";
import { Asistente } from "../entities/Asistentes";

// Crear el repositorio
const citaRepository = AppDataSource.getRepository(Cita);

// Obtener todas las citas
export const srvGetCitas = async () => {
  const citas = await citaRepository.find({
    relations: ["cliente", "profesional", "asistente"],
    order: { fecha_inicio: "DESC" }
  });
  return citas;
};

// Crear una nueva cita
export const srvCreateCita = async (
  cliente: Cliente,
  profesional: Profesional,
  asistente: Asistente,
  fecha_inicio: Date,
  fecha_finalizacion: Date,
  descripcion: string,
  observaciones: string
) => {
  const nuevaCita = new Cita();
  nuevaCita.cliente = cliente;
  nuevaCita.profesional = profesional;
  nuevaCita.asistente = asistente;
  nuevaCita.fecha_inicio = fecha_inicio;
  nuevaCita.fecha_finalizacion = fecha_finalizacion;
  nuevaCita.descripcion = descripcion;
  nuevaCita.observaciones = observaciones;

  return await citaRepository.save(nuevaCita);
};

// Obtener una cita por ID
export const srvGetCitaById = async (id: number) => {
  return await citaRepository.findOne({
    where: { cita_id: id },
    relations: ["cliente", "profesional", "asistente"]
  });
};

// Actualizar una cita
export const srvUpdateCita = async (
  id: number,
  fecha_inicio: Date,
  fecha_finalizacion: Date,
  descripcion: string,
  observaciones: string,
  cita_estado: number
) => {
  const cita = await citaRepository.findOneBy({ cita_id: id });
  if (!cita) return null;

  cita.fecha_inicio = fecha_inicio;
  cita.fecha_finalizacion = fecha_finalizacion;
  cita.descripcion = descripcion;
  cita.observaciones = observaciones; 
  if (cita_estado !== undefined) cita.cita_estado = cita_estado;

  return await citaRepository.save(cita);
};

// Eliminar una cita
export const srvDeleteCita = async (id: number) => {
  const cita = await citaRepository.findOneBy({ cita_id: id });
  if (!cita) return null;

  return await citaRepository.remove(cita);
};

// Agregar al final del archivo Cita.service.ts

// Obtener citas con vista completa
export const srvGetVistaCitas = async () => {
  return await AppDataSource.query(`
    SELECT * FROM vista_citas
  `);
};

// insertar cita validando horario
export const srvInsertarCitaValidandoHorario = async (
  cliente_id: number,
  profesional_id: number,
  asistente_id: number,
  fecha_inicio: Date,
  fecha_finalizacion: Date,
  descripcion: string,
  observaciones: string
) => {
  try {
    await AppDataSource.query(
      `SELECT insertar_cita_validando_horario($1, $2, $3, $4, $5, $6, $7)`,
      [cliente_id, profesional_id, asistente_id, fecha_inicio, fecha_finalizacion, descripcion, observaciones]
    );
    return { success: true };
  } catch (error: unknown) { 
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred.' };
  }
};

// Actualizar cita validando horario
export const srvActualizarCitaValidandoHorario = async (
  cita_id: number,
  fecha_inicio: Date,
  fecha_finalizacion: Date,
  descripcion: string,  // Fixed typo from 'description' to 'descripcion'
  observaciones: string
) => {
  try {
    await AppDataSource.query(
      `SELECT actualizar_cita_validando_horario($1, $2, $3, $4, $5)`,
      [cita_id, fecha_inicio, fecha_finalizacion, descripcion, observaciones]
    );
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Unknown error occurred' };
  }
};