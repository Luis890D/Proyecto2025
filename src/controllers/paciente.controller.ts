import { Request, Response } from "express";
import {
    srvGetPacientes,
    srvGetPacienteByID,
    srvGetPacienteByDPI,
    srvCreatePaciente,
    srvUpdatePaciente,
    srvDeletePaciente,
} from "../services/paciente.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER TODOS LOS PACIENTES
export const getPacientes = async (req: Request, res: Response) => {
    try {
        const pacientes = await srvGetPacientes();
        res.status(200).json(pacientes);
    } catch (error: any) {
        console.error('Error al obtener los pacientes:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener los pacientes.' });
    }
};

// OBTENER UN PACIENTE POR ID
export const getPaciente = async (req: Request, res: Response) => {
    const { idPaciente } = req.params;
    try {
        const paciente = await srvGetPacienteByID(+idPaciente);
        if (!paciente) {
             res.status(404).json({ message: `No se encontró el paciente con ID ${idPaciente}` });
        }
        res.status(200).json(paciente);
    } catch (error: any) {
        console.error('Error al obtener el paciente:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el paciente.' });
    }
};

// OBTENER UN PACIENTE POR DPI
export const getPacienteByDPI = async (req: Request, res: Response) => {
    const { dpi } = req.params;
    try {
        const paciente = await srvGetPacienteByDPI(dpi);
        if (!paciente) {
             res.status(404).json({ message: `No se encontró el paciente con DPI ${dpi}` });
        }
        res.status(200).json(paciente);
    } catch (error: any) {
        console.error('Error al obtener el paciente por DPI:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el paciente por DPI.' });
    }
};

// CREAR UN NUEVO PACIENTE
export const createPaciente = async (req: Request, res: Response) => {
    try {
        const nuevoPaciente = await srvCreatePaciente(req.body);
        res.status(201).json(nuevoPaciente);
    } catch (error: any) {
        console.error('Error al crear el paciente:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear el paciente.' });
    }
};

// ACTUALIZAR UN PACIENTE
export const updatePaciente = async (req: Request, res: Response) => {
    const { idPaciente } = req.params;
    try {
        const pacienteActualizado = await srvUpdatePaciente(+idPaciente, req.body);
        if (!pacienteActualizado) {
             res.status(404).json({ message: `No se encontró el paciente con ID ${idPaciente}` });
        }
        res.status(200).json(pacienteActualizado);
    } catch (error: any) {
        console.error('Error al actualizar el paciente:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el paciente.' });
    }
};

// ELIMINAR UN PACIENTE
export const deletePaciente = async (req: Request, res: Response) => {
    const { idPaciente } = req.params;
    try {
        const resultado = await srvDeletePaciente(+idPaciente);
        if (!resultado) {
             res.status(404).json({ message: `No se encontró el paciente con ID ${idPaciente}` });
        }
        res.status(200).json({ message: `Paciente con ID ${idPaciente} eliminado correctamente.` });
    } catch (error: any) {
        console.error('Error al eliminar el paciente:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el paciente.' });
    }
};