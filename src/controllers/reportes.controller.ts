import { Request, Response } from "express";
import {
    srvGetReporteCitas,
    srvGetReporteProfesionales,
    srvGetReportePacientes,
} from "../services/reportes.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER REPORTE DE CITAS POR ESTADO EN UN RANGO DE FECHAS
export const getReporteCitas = async (req: Request, res: Response) => {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
         res.status(400).json({ message: 'Se deben proporcionar las fechas de inicio y fin.' });
    }

    try {
        const reporte = await srvGetReporteCitas(new Date(fechaInicio as string), new Date(fechaFin as string));
        res.status(200).json(reporte);
    } catch (error: any) {
        console.error('Error al obtener el reporte de citas:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el reporte de citas.' });
    }
};

// OBTENER REPORTE DE PROFESIONALES CON CITAS COMPLETADAS EN UN RANGO DE FECHAS
export const getReporteProfesionales = async (req: Request, res: Response) => {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
         res.status(400).json({ message: 'Se deben proporcionar las fechas de inicio y fin.' });
    }

    try {
        const reporte = await srvGetReporteProfesionales(new Date(fechaInicio as string), new Date(fechaFin as string));
        res.status(200).json(reporte);
    } catch (error: any) {
        console.error('Error al obtener el reporte de profesionales:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el reporte de profesionales.' });
    }
};

// OBTENER REPORTE DE PACIENTES CON MÁS CITAS EN UN RANGO DE FECHAS
export const getReportePacientes = async (req: Request, res: Response) => {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
         res.status(400).json({ message: 'Se deben proporcionar las fechas de inicio y fin.' });
    }

    try {
        const reporte = await srvGetReportePacientes(new Date(fechaInicio as string), new Date(fechaFin as string));
        res.status(200).json(reporte);
    } catch (error: any) {
        console.error('Error al obtener el reporte de pacientes:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el reporte de pacientes.' });
    }
};