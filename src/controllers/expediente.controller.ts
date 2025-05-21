import { Request, Response } from "express";
import {
    srvGetExpedienteByCita,
    srvCreateExpediente,
    srvUpdateExpediente,
    srvGetHistorialMedico,
} from "../services/expediente.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER EL EXPEDIENTE DE UNA CITA
export const getExpedienteByCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    try {
        const expediente = await srvGetExpedienteByCita(+idCita);
        if (!expediente) {
         res.status(404).json({ message: `No se encontró el expediente para la cita con ID ${idCita}` });
        }
        res.status(200).json(expediente);
    } catch (error: any) {
        console.error('Error al obtener el expediente por cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el expediente.' });
    }
};

// CREAR UN NUEVO EXPEDIENTE
export const createExpediente = async (req: Request, res: Response) => {
    try {
        const nuevoExpediente = await srvCreateExpediente(req.body);
        res.status(201).json(nuevoExpediente);
    } catch (error: any) {
        console.error('Error al crear el expediente:', error.message);
        if (error.message === 'Cita no encontrada') {
             res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor al crear el expediente.' });
    }
};

// ACTUALIZAR UN EXPEDIENTE
export const updateExpediente = async (req: Request, res: Response) => {
    const { idExpediente } = req.params;
    try {
        const expedienteActualizado = await srvUpdateExpediente(+idExpediente, req.body);
        if (!expedienteActualizado) {
             res.status(404).json({ message: `No se encontró el expediente con ID ${idExpediente}` });
        }
        res.status(200).json(expedienteActualizado);
    } catch (error: any) {
        console.error('Error al actualizar el expediente:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el expediente.' });
    }
};

// OBTENER EL HISTORIAL MÉDICO DE UN PACIENTE
export const getHistorialMedico = async (req: Request, res: Response) => {
    const { idPaciente } = req.params;
    try {
        const historial = await srvGetHistorialMedico(+idPaciente);
        res.status(200).json(historial);
    } catch (error: any) {
        console.error('Error al obtener el historial médico:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el historial médico.' });
    }
};