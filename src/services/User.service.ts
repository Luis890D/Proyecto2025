import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { Role } from "../entities/Role";

// Repositorio
const userRepository = AppDataSource.getRepository(User);

// Obtener todos los usuarios
export const srvGetUsers = async () => {
  return await userRepository.find({
    relations: ["role"],
    order: { primer_nombre: "ASC" }
  });
};

// Crear un nuevo usuario
export const srvCreateUser = async (
  role: Role,
  primer_nombre: string,
  segundo_nombre: string,
  primer_apellido: string,
  segundo_apellido: string,
  email: string,
  telefono: string,
  celular: string
) => {
  const user = new User();
  user.role = role;
  user.primer_nombre = primer_nombre;
  user.segundo_nombre = segundo_nombre;
  user.primer_apellido = primer_apellido;
  user.segundo_apellido = segundo_apellido;
  user.email = email;
  user.telefono = telefono;
  user.celular = celular;

  return await userRepository.save(user);
};

// Obtener un usuario por DPI
export const srvGetUserByDPI = async (dpi: number) => {
  return await userRepository.findOne({
    where: { DPI: dpi },
    relations: ["role"]
  });
};

// Actualizar un usuario
export const srvUpdateUser = async (
  dpi: number,
  fields: Partial<User>
) => {
  const user = await userRepository.findOneBy({ DPI: dpi });
  if (!user) return null;

  Object.assign(user, fields);

  return await userRepository.save(user);
};

// Eliminar un usuario
export const srvDeleteUser = async (dpi: number) => {
  const user = await userRepository.findOneBy({ DPI: dpi });
  if (!user) return null;

  return await userRepository.remove(user);
};
