import { Router } from 'express';
import {
    getReporteCitas,
    getReporteProfesionales,
    getReportePacientes
} from '../controllers/reportes.controller';

const router = Router();

// Rutas de Reportes
router.get('/reportes/citas', getReporteCitas);
router.get('/reportes/profesionales', getReporteProfesionales);
router.get('/reportes/pacientes', getReportePacientes);

export default router;
