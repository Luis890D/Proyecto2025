import { Request, Response } from "express";
import {
  srvBuscarExpediente,
  srvCrearExpediente,
  srvCreateExpediente,
  srvDeleteExpediente,
  srvGetExpedienteById,
  srvGetExpedientes,
  srvGetVistaExpedienteByClienteId,
  srvGetVistaExpedientes,
  srvUpdateExpediente,
} from "../services/Expediente.service";
import { Cliente } from "../entities/Cliente";

export const getExpedientes = async (req: Request, res: Response) => {
  try {
    const expedientes = await srvGetExpedientes();
     res.status(200).json(expedientes);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener expedientes" });
  }
};

export const getExpediente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expediente = await srvGetExpedienteById(parseInt(id));
    if (!expediente) {
       res.status(404).json({ message: "Expediente no encontrado" });
    }
     res.status(200).json(expediente);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener expediente" });
  }
};

export const createExpediente = async (req: Request, res: Response) => {
  const { cliente, sintomas_diagnostico, recomendaciones, medicamentos, examenes } = req.body;
  try {
    const newExpediente = await srvCreateExpediente(
      cliente as Cliente,
      sintomas_diagnostico,
      recomendaciones,
      medicamentos,
      examenes
    );
     res.status(201).json(newExpediente);
  } catch (error) {
     res.status(500).json({ message: "Error al crear expediente" });
  }
};

export const updateExpediente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { sintomas_diagnostico, recomendaciones, medicamentos, examenes, expediente_estado } = req.body;
  try {
    const updatedExpediente = await srvUpdateExpediente(
      parseInt(id),
      sintomas_diagnostico,
      recomendaciones,
      medicamentos,
      examenes,
      expediente_estado
    );
    if (!updatedExpediente) {
       res.status(404).json({ message: "Expediente no encontrado" });
    }
     res.status(200).json(updatedExpediente);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar expediente" });
  }
};

export const deleteExpediente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedExpediente = await srvDeleteExpediente(parseInt(id));
    if (!deletedExpediente) {
       res.status(404).json({ message: "Expediente no encontrado" });
    }
     res.status(200).json(deletedExpediente);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar expediente" });
  }
};

// Agregar al final del archivo Expediente.controller.ts
export const getVistaExpedientes = async (req: Request, res: Response) => {
  try {
    const expedientes = await srvGetVistaExpedientes();
    res.status(200).json(expedientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener vista de expedientes" });
  }
};

export const getVistaExpedienteByCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const expedientes = await srvGetVistaExpedienteByClienteId(parseInt(id));
    if (!expedientes || expedientes.length === 0) {
      res.status(404).json({ message: "No se encontraron expedientes para este cliente" });
    }
    res.status(200).json(expedientes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener vista de expedientes del cliente" });
  }
};
// Añadir al final del archivo
export const crearExpediente = async (req: Request, res: Response) => {
  const {
    cliente_id,
    sintomas_diagnostico,
    recomendaciones,
    medicamentos,
    examenes
  } = req.body;

  try {
    await srvCrearExpediente(
      cliente_id,
      sintomas_diagnostico,
      recomendaciones,
      medicamentos,
      examenes
    );
    res.status(201).json({ message: "Expediente creado exitosamente" });
  } catch (error: any) {
    res.status(500).json({
      message: "Error al crear expediente",
      error: error.message
    });
  }
};

export const buscarExpediente = async (req: Request, res: Response) => {
  const { cliente_id, expediente_id } = req.query;

  try {
    const result = await srvBuscarExpediente(
      cliente_id ? parseInt(cliente_id as string) : null,
      expediente_id ? parseInt(expediente_id as string) : null
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: "Error al buscar expediente",
      error: error.message
    });
  }
};