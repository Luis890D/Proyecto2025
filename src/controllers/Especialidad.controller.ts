import { Request, Response } from "express";
import {
  srvCreateEspecialidad,
  srvDeleteEspecialidad,
  srvGetEspecialidadByID,
  srvGetEspecialidades,
  srvUpdateEspecialidad,
} from "../services/Especialidad.service";

export const getEspecialidades = async (req: Request, res: Response) => {
  try {
    const especialidades = await srvGetEspecialidades();
     res.status(200).json(especialidades);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener especialidades" });
  }
};

export const getEspecialidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const especialidad = await srvGetEspecialidadByID(parseInt(id));
    if (!especialidad) {
       res.status(404).json({ message: "Especialidad no encontrada" });
    }
     res.status(200).json(especialidad);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener especialidad" });
  }
};

export const createEspecialidad = async (req: Request, res: Response) => {
  const { description } = req.body;
  try {
    const newEspecialidad = await srvCreateEspecialidad(description);
     res.status(201).json(newEspecialidad);
  } catch (error) {
    res.status(500).json({ message: "Error al crear especialidad" });
  }
};

export const updateEspecialidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, estado_especialidad } = req.body;
  try {
    const updatedEspecialidad = await srvUpdateEspecialidad(
      parseInt(id),
      description,
      estado_especialidad
    );
    if (!updatedEspecialidad) {
       res.status(404).json({ message: "Especialidad no encontrada" });
    }
     res.status(200).json(updatedEspecialidad);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar especialidad" });
  }
};

export const deleteEspecialidad = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedEspecialidad = await srvDeleteEspecialidad(parseInt(id));
    if (!deletedEspecialidad) {
       res.status(404).json({ message: "Especialidad no encontrada" });
    }
     res.status(200).json(deletedEspecialidad);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar especialidad" });
  }
};