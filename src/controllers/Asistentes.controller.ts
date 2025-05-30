import { Request, Response } from "express";
import {
  srvCreateAsistente,
  srvDeleteAsistente,
  srvGetAsistenteById,
  srvGetAsistentes,
  srvUpdateAsistente,
} from "../services/Asistentes.service";
import { User } from "../entities/User";

export const getAsistentes = async (req: Request, res: Response) => {
  try {
    const asistentes = await srvGetAsistentes();
     res.status(200).json(asistentes);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener asistentes" });
  }
};

export const getAsistente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const asistente = await srvGetAsistenteById(parseInt(id));
    if (!asistente) {
       res.status(404).json({ message: "Asistente no encontrado" });
    }
     res.status(200).json(asistente);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener asistente" });
  }
};

export const createAsistente = async (req: Request, res: Response) => {
  const { user, nombre_user, password } = req.body; // Espera un objeto 'user'
  try {
    const newAsistente = await srvCreateAsistente(
      user as User, // Se castea directamente
      nombre_user,
      password
    );
     res.status(201).json(newAsistente);
  } catch (error) {
     res.status(500).json({ message: "Error al crear asistente" });
  }
};

export const updateAsistente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre_user, password } = req.body;
  try {
    const updatedAsistente = await srvUpdateAsistente(
      parseInt(id),
      nombre_user,
      password
    );
    if (!updatedAsistente) {
       res.status(404).json({ message: "Asistente no encontrado" });
    }
     res.status(200).json(updatedAsistente);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar asistente" });
  }
};

export const deleteAsistente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedAsistente = await srvDeleteAsistente(parseInt(id));
    if (!deletedAsistente) {
       res.status(404).json({ message: "Asistente no encontrado" });
    }
     res.status(200).json(deletedAsistente);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar asistente" });
  }
};