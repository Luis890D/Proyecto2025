// Profesional.service.ts
import { AppDataSource } from "../config/db";
import { Profesional } from "../entities/Profesional";
import { User } from "../entities/User";
import { Consultorio } from "../entities/Consultorio";
import { Especialidad } from "../entities/Especialidad";

// Repositorio
const profesionalRepository = AppDataSource.getRepository(Profesional);
const userRepository = AppDataSource.getRepository(User); // Added for fetching User
const consultorioRepository = AppDataSource.getRepository(Consultorio); // Added for fetching Consultorio
const especialidadRepository = AppDataSource.getRepository(Especialidad); // Added for fetching Especialidad

// Obtener todos los profesionales
export const srvGetProfesionales = async () => {
  return await profesionalRepository.find({
    relations: ["user", "consultorio", "especialidad"],
    order: { profesional_id: "DESC" }
  });
};

// Crear un nuevo profesional
export const srvCreateProfesional = async (
  userDPI: number, // Changed to userDPI (number)
  nombre_user: string,
  password: string,
  consultorioId: number, // Changed to consultorioId (number)
  especialidadId: number // Changed to especialidadId (number)
) => {
  const user = await userRepository.findOneBy({ DPI: userDPI });
  if (!user) throw new Error("User not found for the provided DPI.");

  const consultorio = await consultorioRepository.findOneBy({ consultorio_id: consultorioId });
  if (!consultorio) throw new Error("Consultorio not found for the provided ID.");

  const especialidad = await especialidadRepository.findOneBy({ Especialidad_id: especialidadId });
  if (!especialidad) throw new Error("Especialidad not found for the provided ID.");

  const profesional = new Profesional();
  profesional.user = user;
  profesional.DPI = userDPI; // Set the DPI directly
  profesional.nombre_user = nombre_user;
  profesional.password = password;
  profesional.consultorio = consultorio;
  profesional.consultorio.consultorio_id = consultorioId; // Set the consultorio_id directly
  profesional.especialidad = especialidad;
  profesional.especialidad.Especialidad_id = especialidadId; // Set the especialidad_id directly

  return await profesionalRepository.save(profesional);
};

// Obtener un profesional por ID
export const srvGetProfesionalById = async (id: number) => {
  return await profesionalRepository.findOne({
    where: { profesional_id: id },
    relations: ["user", "consultorio", "especialidad"]
  });
};

// Actualizar un profesional
export const srvUpdateProfesional = async (
  id: number,
  nombre_user?: string,
  password?: string,
  consultorioId?: number, // Changed to consultorioId (number)
  especialidadId?: number, // Changed to especialidadId (number)
  estado_profesional?: boolean
) => {
  const profesional = await profesionalRepository.findOneBy({ profesional_id: id });
  if (!profesional) return null;

  if (nombre_user !== undefined) profesional.nombre_user = nombre_user;
  if (password !== undefined) profesional.password = password;

  if (consultorioId !== undefined) {
    const consultorio = await consultorioRepository.findOneBy({ consultorio_id: consultorioId });
    if (!consultorio) throw new Error("Consultorio not found for the provided ID.");
    profesional.consultorio = consultorio;
    profesional.consultorio.consultorio_id = consultorioId; // Update the ID directly
  }

  if (especialidadId !== undefined) {
    const especialidad = await especialidadRepository.findOneBy({ Especialidad_id: especialidadId });
    if (!especialidad) throw new Error("Especialidad not found for the provided ID.");
    profesional.especialidad = especialidad;
    profesional.especialidad.Especialidad_id = especialidadId; // Update the ID directly
  }

  if (estado_profesional !== undefined) profesional.estado_profesional = estado_profesional;

  return await profesionalRepository.save(profesional);
};

// Eliminar profesional
export const srvDeleteProfesional = async (id: number) => {
  const profesional = await profesionalRepository.findOneBy({ profesional_id: id });
  if (!profesional) return null;

  return await profesionalRepository.remove(profesional);
};