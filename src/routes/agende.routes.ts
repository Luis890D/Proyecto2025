import { Router } from 'express';
import {
    getAgendaProfesional,
    getHorariosDisponibles
} from '../controllers/agenda.controller';

const router = Router();

// Rutas de Agenda
router.get('/agenda/:idProfesional', getAgendaProfesional);
router.get('/horarios/:idProfesional', getHorariosDisponibles);

export default router;
