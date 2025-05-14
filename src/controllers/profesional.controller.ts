import { Request, Response } from "express";
import {
    srvGetProfesionales,
    srvGetProfesionalByID,
    srvCreateProfesional,
    srvUpdateProfesional,
    srvDeleteProfesional,
} from "../services/profesional.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER TODOS LOS PROFESIONALES
export const getProfesionales = async (req: Request, res: Response) => {
    try {
        const profesionales = await srvGetProfesionales();
        res.status(200).json(profesionales);
    } catch (error: any) {
        console.error('Error al obtener los profesionales:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener los profesionales.' });
    }
};

// OBTENER UN PROFESIONAL POR ID
export const getProfesional = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    try {
        const profesional = await srvGetProfesionalByID(+idProfesional);
        if (!profesional) {
            return res.status(404).json({ message: `No se encontró el profesional con ID ${idProfesional}` });
        }
        res.status(200).json(profesional);
    } catch (error: any) {
        console.error('Error al obtener el profesional:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el profesional.' });
    }
};

// CREAR UN NUEVO PROFESIONAL
export const createProfesional = async (req: Request, res: Response) => {
    try {
        const nuevoProfesional = await srvCreateProfesional(req.body);
        res.status(201).json(nuevoProfesional);
    } catch (error: any) {
        console.error('Error al crear el profesional:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear el profesional.' });
    }
};

// ACTUALIZAR UN PROFESIONAL
export const updateProfesional = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    try {
        const profesionalActualizado = await srvUpdateProfesional(+idProfesional, req.body);
        if (!profesionalActualizado) {
            return res.status(404).json({ message: `No se encontró el profesional con ID ${idProfesional}` });
        }
        res.status(200).json(profesionalActualizado);
    } catch (error: any) {
        console.error('Error al actualizar el profesional:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el profesional.' });
    }
};

// ELIMINAR UN PROFESIONAL
export const deleteProfesional = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    try {
        const resultado = await srvDeleteProfesional(+idProfesional);
        if (!resultado) {
            return res.status(404).json({ message: `No se encontró el profesional con ID ${idProfesional}` });
        }
        res.status(200).json({ message: `Profesional con ID ${idProfesional} eliminado correctamente.` });
    } catch (error: any) {
        console.error('Error al eliminar el profesional:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el profesional.' });
    }
};