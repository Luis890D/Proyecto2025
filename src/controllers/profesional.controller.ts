// Profesional.controller.ts
import { Request, Response } from "express";
import {
  srvCreateProfesional,
  srvDeleteProfesional,
  srvGetProfesionalById,
  srvGetProfesionales,
  srvUpdateProfesional,
} from "../services/Profesional.service";
// Removed direct imports of User, Consultorio, Especialidad as service will handle fetching them

export const getProfesionales = async (req: Request, res: Response) => {
  try {
    const profesionales = await srvGetProfesionales();
     res.status(200).json(profesionales);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener profesionales" });
  }
};

export const getProfesional = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const profesional = await srvGetProfesionalById(parseInt(id));
    if (!profesional) {
       res.status(404).json({ message: "Profesional no encontrado" });
    }
     res.status(200).json(profesional);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener profesional" });
  }
};

export const createProfesional = async (req: Request, res: Response) => {
  // Expecting IDs from the body now
  const { userDPI, nombre_user, password, consultorioId, especialidadId } = req.body;
  try {
    const newProfesional = await srvCreateProfesional(
      userDPI,       // Pass DPI directly
      nombre_user,
      password,
      consultorioId, // Pass ID directly
      especialidadId // Pass ID directly
    );
     res.status(201).json(newProfesional);
  } catch (error: any) { // Added type 'any' for error for better handling
     res.status(500).json({ message: error.message || "Error al crear profesional" }); // Return specific error message
  }
};

export const updateProfesional = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Expecting IDs from the body for relationships
  const { nombre_user, password, consultorioId, especialidadId, estado_profesional } = req.body;
  try {
    const updatedProfesional = await srvUpdateProfesional(
      parseInt(id),
      nombre_user,
      password,
      consultorioId,   // Pass ID directly
      especialidadId,  // Pass ID directly
      estado_profesional
    );
    if (!updatedProfesional) {
       res.status(404).json({ message: "Profesional no encontrado" });
    }
     res.status(200).json(updatedProfesional);
  } catch (error: any) { // Added type 'any' for error
     res.status(500).json({ message: error.message || "Error al actualizar profesional" }); // Return specific error message
  }
};

export const deleteProfesional = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedProfesional = await srvDeleteProfesional(parseInt(id));
    if (!deletedProfesional) {
       res.status(404).json({ message: "Profesional no encontrado" });
    }
     res.status(200).json(deletedProfesional);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar profesional" });
  }
};