import { Router } from 'express';
import {
    getExpedienteByCita,
    createExpediente,
    updateExpediente,
    getHistorialMedico
} from '../controllers/expediente.controller';

const router = Router();

// Rutas de Expediente
router.get('/expedientes/cita/:idCita', getExpedienteByCita);
router.post('/expedientes', createExpediente);
router.put('/expedientes/:idExpediente', updateExpediente);
router.get('/historial/:idPaciente', getHistorialMedico);

export default router;
