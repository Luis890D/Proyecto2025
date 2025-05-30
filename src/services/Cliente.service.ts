import { AppDataSource } from "../config/db";
import { Cliente } from "../entities/Cliente";
import { User } from "../entities/User";

// Crear el repositorio
const clienteRepository = AppDataSource.getRepository(Cliente);

// Obtener todos los clientes
export const srvGetClientes = async () => {
  return await clienteRepository.find({
    relations: ["user"],
    order: { cliente_id: "DESC" }
  });
};

// Crear un nuevo cliente
export const srvCreateCliente = async (user: User) => {
  const nuevoCliente = new Cliente();
  nuevoCliente.user = user;
  return await clienteRepository.save(nuevoCliente);
};

// Obtener cliente por ID
export const srvGetClienteById = async (id: number) => {
  return await clienteRepository.findOne({
    where: { cliente_id: id },
    relations: ["user"]
  });
};

// Actualizar cliente (ejemplo: cambiar estado)
export const srvUpdateClienteEstado = async (id: number, estado: boolean) => {
  const cliente = await clienteRepository.findOneBy({ cliente_id: id });
  if (!cliente) return null;

  cliente.estado_cliente = estado;
  return await clienteRepository.save(cliente);
};

// Eliminar cliente
export const srvDeleteCliente = async (id: number) => {
  const cliente = await clienteRepository.findOneBy({ cliente_id: id });
  if (!cliente) return null;

  return await clienteRepository.remove(cliente);
};
