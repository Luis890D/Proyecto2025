import { Router } from 'express';
import {
    getHistorialByCita,
    createRegistroHistorial
} from '../controllers/historial-cita.controller';

const router = Router();

// Obtener historial de una cita específica
router.get('/cita/:idCita', getHistorialByCita);

// Crear nuevo registro en el historial
router.post('/', createRegistroHistorial);

export default router;