import { AppDataSource } from "../config/db";
import { Asistente } from "../entities/Asistentes"; 
import { User } from "../entities/User";

// Crear el repositorio
const asistenteRepository = AppDataSource.getRepository(Asistente);

// Obtener todos los asistentes
export const srvGetAsistentes = async () => {
  const asistentes = await asistenteRepository.find({
    relations: ["user"],
    order: { nombre_user: "ASC" }
  });
  return asistentes;
};

// Crear un nuevo asistente
export const srvCreateAsistente = async (
  user: User, // Espera un objeto User
  nombre_user: string,
  password: string
) => {
  const nuevoAsistente = new Asistente();
  nuevoAsistente.user = user;
  nuevoAsistente.nombre_user = nombre_user;
  nuevoAsistente.password = password;

  return await asistenteRepository.save(nuevoAsistente);
};

// Obtener un asistente por ID
export const srvGetAsistenteById = async (id: number) => {
  const asistente = await asistenteRepository.findOne({
    where: { asistente_id: id },
    relations: ["user"]
  });
  return asistente;
};

// Actualizar un asistente
export const srvUpdateAsistente = async (
  id: number,
  nombre_user: string,
  password: string
) => {
  const asistente = await asistenteRepository.findOneBy({ asistente_id: id });
  if (!asistente) return null;

  asistente.nombre_user = nombre_user;
  asistente.password = password;

  return await asistenteRepository.save(asistente);
};

// Eliminar asistente
export const srvDeleteAsistente = async (id: number) => {
  const asistente = await asistenteRepository.findOneBy({ asistente_id: id });
  if (!asistente) return null;

  return await asistenteRepository.remove(asistente);
};
