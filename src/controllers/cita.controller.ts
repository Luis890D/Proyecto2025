import { Request, Response } from "express";
import {
  srvActualizarCitaValidandoHorario,
  srvCreateCita,
  srvDeleteCita,
  srvGetCitaById,
  srvGetCitas,
  srvGetVistaCitas,
  srvInsertarCitaValidandoHorario,
  srvUpdateCita,
} from "../services/Cita.service";
import { Cliente } from "../entities/Cliente";
import { Profesional } from "../entities/Profesional";
import { Asistente } from "../entities/Asistentes";

export const getCitas = async (req: Request, res: Response) => {
  try {
    const citas = await srvGetCitas();
     res.status(200).json(citas);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener citas" });
  }
};

export const getCita = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cita = await srvGetCitaById(parseInt(id));
    if (!cita) {
       res.status(404).json({ message: "Cita no encontrada" });
    }
     res.status(200).json(cita);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener cita" });
  }
};

export const createCita = async (req: Request, res: Response) => {
  const {
    cliente,
    profesional,
    asistente,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
    observaciones,
  } = req.body;
  try {
    const newCita = await srvCreateCita(
      cliente as Cliente,
      profesional as Profesional,
      asistente as Asistente,
      new Date(fecha_inicio),
      new Date(fecha_finalizacion),
      descripcion,
      observaciones
    );
     res.status(201).json(newCita);
  } catch (error) {
     res.status(500).json({ message: "Error al crear cita" });
  }
};

export const updateCita = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fecha_inicio, fecha_finalizacion, descripcion, observaciones, cita_estado } = req.body;
  try {
    const updatedCita = await srvUpdateCita(
      parseInt(id),
      new Date(fecha_inicio),
      new Date(fecha_finalizacion),
      descripcion,
      observaciones,
      cita_estado
    );
    if (!updatedCita) {
       res.status(404).json({ message: "Cita no encontrada" });
    }
     res.status(200).json(updatedCita);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar cita" });
  }
};
export const deleteCita = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCita = await srvDeleteCita(parseInt(id));
    if (!deletedCita) {
       res.status(404).json({ message: "Cita no encontrada" });
    }
     res.status(200).json(deletedCita);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar cita" });
  }
};
// Agregar al final del archivo Cita.controller.ts
export const getVistaCitas = async (req: Request, res: Response) => {
  try {
    const citas = await srvGetVistaCitas();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener vista de citas" });
  }
};
// Añadir al final del archivo
export const insertarCitaValidandoHorario = async (req: Request, res: Response) => {
  const {
    cliente_id,
    profesional_id,
    asistente_id,
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
    observaciones
  } = req.body;

  try {
    const result = await srvInsertarCitaValidandoHorario(
      cliente_id,
      profesional_id,
      asistente_id,
      new Date(fecha_inicio),
      new Date(fecha_finalizacion),
      descripcion,
      observaciones
    );

    if (!result.success) {
       res.status(400).json(result);
    }
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

export const actualizarCitaValidandoHorario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    fecha_inicio,
    fecha_finalizacion,
    descripcion,
    observaciones
  } = req.body;

  try {
    const result = await srvActualizarCitaValidandoHorario(
      parseInt(id),
      new Date(fecha_inicio),
      new Date(fecha_finalizacion),
      descripcion,
      observaciones
    );

    if (!result.success) {
       res.status(400).json(result);
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};