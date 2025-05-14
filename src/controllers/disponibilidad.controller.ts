import {
    srvCreateDisponibilidad,
    srvDeleteDisponibilidad,
    srvGetDisponibilidadByID,
    srvGetDisponibilidades,
    srvUpdateDisponibilidad
} from "../services/disponibilidad.service";

export const getDisponibilidades = async (req: Request, res: Response) => {
    const result = await srvGetDisponibilidades(+req.params.idProfesional);
    res.json(result);
};

export const getDisponibilidad = async (req: Request, res: Response) => {
    const result = await srvGetDisponibilidadByID(+req.params.id);
    if (!result) return res.status(404).json({ message: "No encontrada" });
    res.json(result);
};

export const createDisponibilidad = async (req: Request, res: Response) => {
    const result = await srvCreateDisponibilidad(req.body);
    res.status(201).json(result);
};

export const updateDisponibilidad = async (req: Request, res: Response) => {
    const result = await srvUpdateDisponibilidad(+req.params.id, req.body);
    if (!result) return res.status(404).json({ message: "No encontrada" });
    res.json(result);
};

export const deleteDisponibilidad = async (req: Request, res: Response) => {
    const result = await srvDeleteDisponibilidad(+req.params.id);
    if (!result) return res.status(404).json({ message: "No encontrada" });
    res.json({ message: "Eliminada correctamente" });
};