import { Request, Response } from "express";
import {
    srvGetHistorialByCita,
    srvCreateRegistroHistorial,
} from "../services/historial-cita.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER EL HISTORIAL DE UNA CITA
export const getHistorialByCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    try {
        const historial = await srvGetHistorialByCita(+idCita);
        res.status(200).json(historial);
    } catch (error: any) {
        console.error('Error al obtener el historial de la cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el historial de la cita.' });
    }
};

// CREAR UN NUEVO REGISTRO EN EL HISTORIAL DE LA CITA
export const createRegistroHistorial = async (req: Request, res: Response) => {
    try {
        const nuevoRegistro = await srvCreateRegistroHistorial(req.body);
        res.status(201).json(nuevoRegistro);
    } catch (error: any) {
        console.error('Error al crear el registro en el historial:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear el registro en el historial.' });
    }
};