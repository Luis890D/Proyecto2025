import { Request, Response } from "express";
import {
    srvGetDisponibilidades,
    srvGetDisponibilidadByID,
    srvCreateDisponibilidad,
    srvUpdateDisponibilidad,
    srvDeleteDisponibilidad,
} from "../services/disponibilidad.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER TODAS LAS DISPONIBILIDADES DE UN PROFESIONAL
export const getDisponibilidades = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    try {
        const disponibilidades = await srvGetDisponibilidades(+idProfesional);
        res.status(200).json(disponibilidades);
    } catch (error: any) {
        console.error('Error al obtener las disponibilidades:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener las disponibilidades.' });
    }
};

// OBTENER UNA DISPONIBILIDAD POR ID
export const getDisponibilidad = async (req: Request, res: Response) => {
    const { idDisponibilidad } = req.params;
    try {
        const disponibilidad = await srvGetDisponibilidadByID(+idDisponibilidad);
        if (!disponibilidad) {
             res.status(404).json({ message: `No se encontró la disponibilidad con ID ${idDisponibilidad}` });
        }
        res.status(200).json(disponibilidad);
    } catch (error: any) {
        console.error('Error al obtener la disponibilidad:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener la disponibilidad.' });
    }
};

// CREAR UNA NUEVA DISPONIBILIDAD
export const createDisponibilidad = async (req: Request, res: Response) => {
    try {
        const nuevaDisponibilidad = await srvCreateDisponibilidad(req.body);
        res.status(201).json(nuevaDisponibilidad);
    } catch (error: any) {
        console.error('Error al crear la disponibilidad:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear la disponibilidad.' });
    }
};

// ACTUALIZAR UNA DISPONIBILIDAD
export const updateDisponibilidad = async (req: Request, res: Response) => {
    const { idDisponibilidad } = req.params;
    try {
        const disponibilidadActualizada = await srvUpdateDisponibilidad(+idDisponibilidad, req.body);
        if (!disponibilidadActualizada) {
             res.status(404).json({ message: `No se encontró la disponibilidad con ID ${idDisponibilidad}` });
        }
        res.status(200).json(disponibilidadActualizada);
    } catch (error: any) {
        console.error('Error al actualizar la disponibilidad:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar la disponibilidad.' });
    }
};

// ELIMINAR UNA DISPONIBILIDAD
export const deleteDisponibilidad = async (req: Request, res: Response) => {
    const { idDisponibilidad } = req.params;
    try {
        const resultado = await srvDeleteDisponibilidad(+idDisponibilidad);
        if (!resultado) {
             res.status(404).json({ message: `No se encontró la disponibilidad con ID ${idDisponibilidad}` });
        }
        res.status(200).json({ message: `Disponibilidad con ID ${idDisponibilidad} eliminada correctamente.` });
    } catch (error: any) {
        console.error('Error al eliminar la disponibilidad:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al eliminar la disponibilidad.' });
    }
};