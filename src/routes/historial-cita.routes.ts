import { Router } from 'express';
import {
    getHistorialByCita,
    createRegistroHistorial
} from '../controllers/historial-cita.controller';

const router = Router();

// Rutas de Historial Cita
router.get('/historial-cita/:idCita', getHistorialByCita);
router.post('/historial-cita', createRegistroHistorial);

export default router;
