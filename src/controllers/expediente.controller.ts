import { Request, Response } from "express";
import {
  srvCreateExpediente,
  srvDeleteExpediente,
  srvGetExpedienteById,
  srvGetExpedientes,
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