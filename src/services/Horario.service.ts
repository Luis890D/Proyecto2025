import { AppDataSource } from "../config/db";
import { Horario, TipoHorario } from "../entities/Horario";
import { Profesional } from "../entities/Profesional";

// Repositorio
const horarioRepository = AppDataSource.getRepository(Horario);

// Obtener todos los horarios
export const srvGetHorarios = async () => {
  return await horarioRepository.find({
    relations: ["profesional"],
    order: { fecha: "DESC", hora_inicio: "ASC" }
  });
};

// Crear un nuevo horario
export const srvCreateHorario = async (
  profesional: Profesional,
  fecha: string,
  hora_inicio: Date,
  hora_finalizacion: Date,
  tipo: TipoHorario
) => {
  const horario = new Horario();
  horario.profesional = profesional;
  horario.fecha = fecha;
  horario.hora_inicio = hora_inicio;
  horario.hora_finalizacion = hora_finalizacion;
  horario.tipo = tipo;

  return await horarioRepository.save(horario);
};

// Obtener un horario por ID
export const srvGetHorarioById = async (id: number) => {
  return await horarioRepository.findOne({
    where: { horario_id: id },
    relations: ["profesional"]
  });
};

// Actualizar horario
export const srvUpdateHorario = async (
  id: number,
  fecha: string,
  hora_inicio: Date,
  hora_finalizacion: Date,
  tipo: TipoHorario
) => {
  const horario = await horarioRepository.findOneBy({ horario_id: id });
  if (!horario) return null;

  horario.fecha = fecha;
  horario.hora_inicio = hora_inicio;
  horario.hora_finalizacion = hora_finalizacion;
  horario.tipo = tipo;

  return await horarioRepository.save(horario);
};

// Eliminar horario
export const srvDeleteHorario = async (id: number) => {
  const horario = await horarioRepository.findOneBy({ horario_id: id });
  if (!horario) return null;

  return await horarioRepository.remove(horario);
};
