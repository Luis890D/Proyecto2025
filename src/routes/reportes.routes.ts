import { Router } from 'express';
import {
    getReporteCitas,
    getReporteProfesionales,
    getReportePacientes
} from '../controllers/reportes.controller';

const router = Router();

// Reporte de citas por estado
router.get('/citas', getReporteCitas);

// Reporte de profesionales con citas completadas
router.get('/profesionales', getReporteProfesionales);

// Reporte de pacientes con más citas
router.get('/pacientes', getReportePacientes);

export default router;