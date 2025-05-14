import { Request, Response } from "express";
import {
    srvCreateCita,
    srvDeleteCita,
    srvGetCitaByID,
    srvGetCitas,
    srvGetCitasByPaciente,
    srvGetCitasByProfesional,
    srvUpdateCita,
    srvUpdateEstadoCita
} from "../services/cita.service";

export const getCitas = async (_: Request, res: Response) => {
    const citas = await srvGetCitas();
    res.json(citas);
};

export const getCita = async (req: Request, res: Response) => {
    const cita = await srvGetCitaByID(+req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(cita);
};

export const getCitasByPaciente = async (req: Request, res: Response) => {
    const citas = await srvGetCitasByPaciente(+req.params.idPaciente);
    res.json(citas);
};

export const getCitasByProfesional = async (req: Request, res: Response) => {
    const citas = await srvGetCitasByProfesional(+req.params.idProfesional);
    res.json(citas);
};

export const createCita = async (req: Request, res: Response) => {
    const cita = await srvCreateCita(req.body);
    res.status(201).json(cita);
};

export const updateCita = async (req: Request, res: Response) => {
    const cita = await srvUpdateCita(+req.params.id, req.body);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(cita);
};

export const updateEstadoCita = async (req: Request, res: Response) => {
    const cita = await srvUpdateEstadoCita(+req.params.id, req.body.estado);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(cita);
};

export const deleteCita = async (req: Request, res: Response) => {
    const cita = await srvDeleteCita(+req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json({ message: "Cita eliminada" });
};
