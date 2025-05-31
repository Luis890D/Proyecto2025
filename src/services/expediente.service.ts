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

// Agregar al final del archivo Expediente.service.ts

// Obtener expedientes con vista completa
export const srvGetVistaExpedientes = async () => {
  return await AppDataSource.query(`
    SELECT * FROM vista_clientes_expedientes
  `);
};

// Obtener expediente por cliente con vista completa
export const srvGetVistaExpedienteByClienteId = async (clienteId: number) => {
  return await AppDataSource.query(`
    SELECT * FROM vista_clientes_expedientes
    WHERE cliente_id = $1
  `, [clienteId]);
};

// Add these to Expediente.service.ts

// Crear expediente usando función PostgreSQL
export const srvCrearExpediente = async (
  cliente_id: number,
  sintomas_diagnostico: string,
  recomendaciones: string,
  medicamentos: string,
  examenes: string
) => {
  await AppDataSource.query(
    `SELECT crear_expediente($1, $2, $3, $4, $5)`,
    [cliente_id, sintomas_diagnostico, recomendaciones, medicamentos, examenes]
  );
};

// Actualizar expediente usando función PostgreSQL
export const srvActualizarExpediente = async (
  expediente_id: number,
  sintomas_diagnostico: string,
  recomendaciones: string,
  medicamentos: string,
  examenes: string
) => {
  await AppDataSource.query(
    `SELECT actualizar_expediente($1, $2, $3, $4, $5)`,
    [expediente_id, sintomas_diagnostico, recomendaciones, medicamentos, examenes]
  );
};

// Eliminar expediente (cambio de estado)
export const srvEliminarExpediente = async (expediente_id: number) => {
  await AppDataSource.query(
    `SELECT eliminar_expediente($1)`,
    [expediente_id]
  );
};

// Buscar expediente por cliente_id o expediente_id
export const srvBuscarExpediente = async (
  cliente_id: number | null = null,
  expediente_id: number | null = null
) => {
  return await AppDataSource.query(
    `SELECT * FROM buscar_expediente($1, $2)`,
    [cliente_id, expediente_id]
  );
};

