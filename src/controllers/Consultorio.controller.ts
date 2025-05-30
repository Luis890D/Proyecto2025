import { Request, Response } from "express";
import {
  srvCreateConsultorio,
  srvDeleteConsultorio,
  srvGetConsultorioByID,
  srvGetConsultorios,
  srvUpdateConsultorio,
} from "../services/Consultorio.service";

export const getConsultorios = async (req: Request, res: Response) => {
  try {
    const consultorios = await srvGetConsultorios();
     res.status(200).json(consultorios);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener consultorios" });
  }
};

export const getConsultorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const consultorio = await srvGetConsultorioByID(parseInt(id));
    if (!consultorio) {
       res.status(404).json({ message: "Consultorio no encontrado" });
    }
     res.status(200).json(consultorio);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener consultorio" });
  }
};

export const createConsultorio = async (req: Request, res: Response) => {
  const { direccion, telefono } = req.body;
  try {
    const newConsultorio = await srvCreateConsultorio(direccion, telefono);
     res.status(201).json(newConsultorio);
  } catch (error) {
     res.status(500).json({ message: "Error al crear consultorio" });
  }
};

export const updateConsultorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { direccion, telefono, estado_consultorio } = req.body;
  try {
    const updatedConsultorio = await srvUpdateConsultorio(
      parseInt(id),
      direccion,
      telefono,
      estado_consultorio
    );
    if (!updatedConsultorio) {
       res.status(404).json({ message: "Consultorio no encontrado" });
    }
     res.status(200).json(updatedConsultorio);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar consultorio" });
  }
};

export const deleteConsultorio = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedConsultorio = await srvDeleteConsultorio(parseInt(id));
    if (!deletedConsultorio) {
       res.status(404).json({ message: "Consultorio no encontrado" });
    }
     res.status(200).json(deletedConsultorio);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar consultorio" });
  }
};