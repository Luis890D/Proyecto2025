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

// Add these to User.service.ts

// Registrar usuario usando procedimiento PostgreSQL
export const srvRegistrarUsuario = async (
  dpi: number,
  role_id: number,
  primer_nombre: string,
  segundo_nombre: string,
  primer_apellido: string,
  segundo_apellido: string,
  email: string,
  telefono: string,
  celular: string
) => {
  await AppDataSource.query(
    `CALL registrar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [dpi, role_id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, telefono, celular]
  );
};

// Actualizar usuario usando procedimiento PostgreSQL
export const srvActualizarUsuario = async (
  dpi: number,
  role_id: number,
  primer_nombre: string,
  segundo_nombre: string,
  primer_apellido: string,
  segundo_apellido: string,
  email: string,
  telefono: string,
  celular: string
) => {
  await AppDataSource.query(
    `CALL actualizar_usuario($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [dpi, role_id, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, telefono, celular]
  );
};

// Login de usuario (profesional o asistente)
export const srvLoginUsuario = async (
  nombre_user: string,
  password: string
) => {
  const result = await AppDataSource.query(
    `SELECT * FROM login_usuario($1, $2)`,
    [nombre_user, password]
  );
  return result[0]; // Return the first result (if any)
};