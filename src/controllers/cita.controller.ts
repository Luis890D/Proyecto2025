import { Request, Response } from "express";
import {
    srvGetCitas,
    srvGetCitaByID,
    srvGetCitasByPaciente,
    srvGetCitasByProfesional,
    srvCreateCita,
    srvUpdateCita,
    srvUpdateEstadoCita,
    srvDeleteCita,
} from "../services/cita.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER TODAS LAS CITAS
export const getCitas = async (req: Request, res: Response) => {
    try {
        const citas = await srvGetCitas();
        res.status(200).json(citas);
    } catch (error: any) {
        console.error('Error al obtener las citas:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener las citas.' });
    }
};

// OBTENER UNA CITA POR ID
export const getCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    try {
        const cita = await srvGetCitaByID(+idCita);
        if (!cita) {
             res.status(404).json({ message: `No se encontró la cita con ID ${idCita}` });
        }
        res.status(200).json(cita);
    } catch (error: any) {
        console.error('Error al obtener la cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener la cita.' });
    }
};

// OBTENER CITAS POR PACIENTE
export const getCitasByPaciente = async (req: Request, res: Response) => {
    const { idPaciente } = req.params;
    try {
        const citas = await srvGetCitasByPaciente(+idPaciente);
        res.status(200).json(citas);
    } catch (error: any) {
        console.error('Error al obtener las citas del paciente:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener las citas del paciente.' });
    }
};

// OBTENER CITAS POR PROFESIONAL
export const getCitasByProfesional = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    try {
        const citas = await srvGetCitasByProfesional(+idProfesional);
        res.status(200).json(citas);
    } catch (error: any) {
        console.error('Error al obtener las citas del profesional:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener las citas del profesional.' });
    }
};

// CREAR UNA NUEVA CITA
export const createCita = async (req: Request, res: Response) => {
    try {
        const nuevaCita = await srvCreateCita(req.body);
        res.status(201).json(nuevaCita);
    } catch (error: any) {
        console.error('Error al crear la cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear la cita.' });
    }
};

// ACTUALIZAR UNA CITA
export const updateCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    try {
        const citaActualizada = await srvUpdateCita(+idCita, req.body);
        if (!citaActualizada) {
             res.status(404).json({ message: `No se encontró la cita con ID ${idCita}` });
        }
        res.status(200).json(citaActualizada);
    } catch (error: any) {
        console.error('Error al actualizar la cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar la cita.' });
    }
};

// ACTUALIZAR EL ESTADO DE UNA CITA
export const updateEstadoCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    const { estado } = req.body;
    try {
        const citaActualizada = await srvUpdateEstadoCita(+idCita, estado);
        if (!citaActualizada) {
             res.status(404).json({ message: `No se encontró la cita con ID ${idCita}` });
        }
        res.status(200).json(citaActualizada);
    } catch (error: any) {
        console.error('Error al actualizar el estado de la cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el estado de la cita.' });
    }
};

// ELIMINAR UNA CITA
export const deleteCita = async (req: Request, res: Response) => {
    const { idCita } = req.params;
    try {
        const resultado = await srvDeleteCita(+idCita);
        if (!resultado) {
             res.status(404).json({ message: `No se encontró la cita con ID ${idCita}` });
        }
        res.status(200).json({ message: `Cita con ID ${idCita} eliminada correctamente.` });
    } catch (error: any) {
        console.error('Error al eliminar la cita:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al eliminar la cita.' });
    }
};