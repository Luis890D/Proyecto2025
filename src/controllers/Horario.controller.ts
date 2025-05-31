import { Request, Response } from "express";
import {
  srvActualizarHorario,
  srvCreateHorario,
  srvDeleteHorario,
  srvGetHorarioById,
  srvGetHorarios,
  srvGetVistaHorariosByProfesionalId,
  srvGetVistaHorariosProfesionales,
  srvInsertarHorario,
  srvUpdateHorario,
} from "../services/Horario.service";
import { Profesional } from "../entities/Profesional";
import { TipoHorario } from "../entities/Horario";

export const getHorarios = async (req: Request, res: Response) => {
  try {
    const horarios = await srvGetHorarios();
     res.status(200).json(horarios);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener horarios" });
  }
};

export const getHorario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const horario = await srvGetHorarioById(parseInt(id));
    if (!horario) {
       res.status(404).json({ message: "Horario no encontrado" });
    }
     res.status(200).json(horario);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener horario" });
  }
};

export const createHorario = async (req: Request, res: Response) => {
  const { profesional, fecha, hora_inicio, hora_finalizacion, tipo } = req.body;
  try {
    const newHorario = await srvCreateHorario(
      profesional as Profesional,
      fecha,
      new Date(hora_inicio),
      new Date(hora_finalizacion),
      tipo as TipoHorario
    );
     res.status(201).json(newHorario);
  } catch (error) {
     res.status(500).json({ message: "Error al crear horario" });
  }
};

export const updateHorario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fecha, hora_inicio, hora_finalizacion, tipo } = req.body;
  try {
    const updatedHorario = await srvUpdateHorario(
      parseInt(id),
      fecha,
      new Date(hora_inicio),
      new Date(hora_finalizacion),
      tipo
    );
    if (!updatedHorario) {
       res.status(404).json({ message: "Horario no encontrado" });
    }
     res.status(200).json(updatedHorario);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar horario" });
  }
};

export const deleteHorario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedHorario = await srvDeleteHorario(parseInt(id));
    if (!deletedHorario) {
       res.status(404).json({ message: "Horario no encontrado" });
    }
     res.status(200).json(deletedHorario);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar horario" });
  }
};
// Agregar al final del archivo Horario.controller.ts
export const getVistaHorariosProfesionales = async (req: Request, res: Response) => {
  try {
    const horarios = await srvGetVistaHorariosProfesionales();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener vista de horarios profesionales" });
  }
};

export const getVistaHorariosByProfesional = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const horarios = await srvGetVistaHorariosByProfesionalId(parseInt(id));
    if (!horarios || horarios.length === 0) {
      res.status(404).json({ message: "No se encontraron horarios para este profesional" });
    }
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener vista de horarios del profesional" });
  }
};
// Añadir al final del archivo
export const insertarHorario = async (req: Request, res: Response) => {
  const {
    profesional_id,
    fecha,
    hora_inicio,
    hora_finalizacion,
    tipo
  } = req.body;

  try {
    const result = await srvInsertarHorario(
      profesional_id,
      fecha,
      new Date(hora_inicio),
      new Date(hora_finalizacion),
      tipo
    );
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: "Error al insertar horario",
      error: error.message
    });
  }
};

export const actualizarHorario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    fecha,
    hora_inicio,
    hora_finalizacion,
    tipo
  } = req.body;

  try {
    const result = await srvActualizarHorario(
      parseInt(id),
      fecha,
      new Date(hora_inicio),
      new Date(hora_finalizacion),
      tipo
    );
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: "Error al actualizar horario",
      error: error.message
    });
  }
};