import { Request, Response } from "express";
import {
    srvGetDiasNoLaborables,
    srvCreateDiaNoLaborable,
    srvDeleteDiaNoLaborable,
    srvCheckDiaNoLaborable,
} from "../services/dia-no-laborable.service"; // Asegúrate de que la ruta al servicio sea correcta

// OBTENER LOS DÍAS NO LABORABLES DE UN PROFESIONAL
export const getDiasNoLaborables = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    try {
        const diasNoLaborables = await srvGetDiasNoLaborables(+idProfesional);
        res.status(200).json(diasNoLaborables);
    } catch (error: any) {
        console.error('Error al obtener los días no laborables:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener los días no laborables.' });
    }
};

// CREAR UN NUEVO DÍA NO LABORABLE
export const createDiaNoLaborable = async (req: Request, res: Response) => {
    try {
        const nuevoDiaNoLaborable = await srvCreateDiaNoLaborable(req.body);
        res.status(201).json(nuevoDiaNoLaborable);
    } catch (error: any) {
        console.error('Error al crear el día no laborable:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear el día no laborable.' });
    }
};

// ELIMINAR UN DÍA NO LABORABLE
export const deleteDiaNoLaborable = async (req: Request, res: Response) => {
    const { idDiaNoLaborable } = req.params;
    try {
        const resultado = await srvDeleteDiaNoLaborable(+idDiaNoLaborable);
        if (!resultado) {
            res.status(404).json({ message: `No se encontró el día no laborable con ID ${idDiaNoLaborable}` });
        }
        res.status(200).json({ message: `Día no laborable con ID ${idDiaNoLaborable} eliminado correctamente.` });
    } catch (error: any) {
        console.error('Error al eliminar el día no laborable:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el día no laborable.' });
    }
};

// VERIFICAR SI UNA FECHA ES UN DÍA NO LABORABLE PARA UN PROFESIONAL
export const checkDiaNoLaborable = async (req: Request, res: Response) => {
    const { idProfesional } = req.params;
    const { fecha } = req.query;

    if (!fecha) {
         res.status(400).json({ message: 'Se debe proporcionar la fecha a verificar.' });
    }

    try {
        const esDiaNoLaborable = await srvCheckDiaNoLaborable(+idProfesional, new Date(fecha as string));
        res.status(200).json({ esDiaNoLaborable: !!esDiaNoLaborable });
    } catch (error: any) {
        console.error('Error al verificar el día no laborable:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al verificar el día no laborable.' });
    }
};