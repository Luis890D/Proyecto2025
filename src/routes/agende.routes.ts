import { Router } from 'express';
import {
    getAgendaProfesional,
    getHorariosDisponibles
} from '../controllers/agenda.controller';

const router = Router();

// Obtener agenda de profesional por rango de fechas
router.get('/profesional/:idProfesional/agenda', getAgendaProfesional);

// Obtener horarios disponibles de profesional para una fecha específica
router.get('/profesional/:idProfesional/horarios-disponibles', getHorariosDisponibles);

export default router;