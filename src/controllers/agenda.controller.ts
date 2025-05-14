import { Request, Response } from "express";
import {
    srvGetAgendaProfesional,
    srvGetHorariosDisponibles,
} from "../services/agenda.service";

// OBTENER LA AGENDA DE UN PROFESIONAL POR RANGO DE FECHAS
export const getAgendaProfesional = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
        return res.status(400).json({ message: 'Se deben proporcionar las fechas de inicio y fin.' });
    }

    try {
        const agenda = await srvGetAgendaProfesional(
            +idProfesional,
            new Date(fechaInicio as string),
            new Date(fechaFin as string)
        );
        res.status(200).json(agenda);
    } catch (error: any) {
        console.error('Error al obtener la agenda del profesional:', error.message);
        if (error.message === 'Profesional no encontrado') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor al obtener la agenda.' });
    }
};

// OBTENER LOS HORARIOS DISPONIBLES DE UN PROFESIONAL PARA UNA FECHA ESPECÍFICA
export const getHorariosDisponibles = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    const { fecha } = req.query;

    if (!fecha) {
        return res.status(400).json({ message: 'Se debe proporcionar la fecha.' });
    }

    try {
        const horarios = await srvGetHorariosDisponibles(+idProfesional, new Date(fecha as string));
        res.status(200).json(horarios);
    } catch (error: any) {
        console.error('Error al obtener los horarios disponibles:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener los horarios disponibles.' });
    }
};