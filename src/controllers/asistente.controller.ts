import { Request, Response } from "express";
import {
    srvGetAsistentes,
    srvGetAsistenteByID,
    srvCreateAsistente,
    srvUpdateAsistente,
    srvDeleteAsistente
} from "../services/asistente.service";

// OBTENER TODOS LOS ASISTENTES
export const getAsistentes = async (req: Request, res: Response) => {
    try {
        const asistentes = await srvGetAsistentes();
        res.status(200).json(asistentes);
    } catch (error) {
        console.log('Error al obtener los asistentes: ', error);
        res.status(500).json({ message: 'Error del servidor al obtener asistentes' });
    }
};

// OBTENER UN ASISTENTE POR ID
export const getAsistente = async (req: Request, res: Response) => {
    try {
        const { idAsistente } = req.params;
        const asistente = await srvGetAsistenteByID(+idAsistente);

        if (!asistente) {
             res.status(404).json({ message: 'No se encontró el asistente con ID ' + idAsistente });
        }

        res.status(200).json(asistente);
    } catch (error) {
        console.log('Error al obtener el asistente: ', error);
        res.status(500).json({ message: 'Error del servidor al obtener el asistente' });
    }
};

// CREAR UN ASISTENTE
export const createAsistente = async (req: Request, res: Response) => {
    try {
        const { idUsuario, telefono, fechaContratacion } = req.body;

        const nuevoAsistente = await srvCreateAsistente({
            idUsuario,
            telefono,
            fechaContratacion: fechaContratacion ? new Date(fechaContratacion) : undefined
        });

        res.status(201).json(nuevoAsistente);
    } catch (error) {
        console.log('Error al crear el asistente: ', error);
        res.status(500).json({ message: 'Error del servidor al crear el asistente' });
    }
};

// ACTUALIZAR UN ASISTENTE
export const updateAsistente = async (req: Request, res: Response) => {
    try {
        const { idAsistente } = req.params;
        const updateData = req.body;

        const asistente = await srvGetAsistenteByID(+idAsistente);

        if (!asistente) {
             res.status(404).json({ message: 'No se encontró el asistente con ID ' + idAsistente });
        }

        const asistenteActualizado = await srvUpdateAsistente(+idAsistente, updateData);
        res.status(200).json(asistenteActualizado);
    } catch (error) {
        console.log('Error al actualizar el asistente: ', error);
        res.status(500).json({ message: 'Error del servidor al actualizar el asistente' });
    }
};

// ELIMINAR UN ASISTENTE
export const deleteAsistente = async (req: Request, res: Response) => {
    try {
        const { idAsistente } = req.params;

        const asistente = await srvGetAsistenteByID(+idAsistente);

        if (!asistente) {
         res.status(404).json({ message: 'No se encontró el asistente con ID ' + idAsistente });
        }

        await srvDeleteAsistente(+idAsistente);
        res.status(200).json({ message: 'Asistente eliminado correctamente' });
    } catch (error) {
        console.log('Error al eliminar el asistente: ', error);
        res.status(500).json({ message: 'Error del servidor al eliminar el asistente' });
    }
};
