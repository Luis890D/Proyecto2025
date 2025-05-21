import { Router } from 'express';
import {
    getDisponibilidades,
    getDisponibilidad,
    createDisponibilidad,
    updateDisponibilidad,
    deleteDisponibilidad
} from '../controllers/disponibilidad.controller';

const router = Router();

// Rutas de Disponibilidad
router.get('/disponibilidades/:idProfesional', getDisponibilidades);
router.get('/disponibilidades/:idDisponibilidad', getDisponibilidad);
router.post('/disponibilidades', createDisponibilidad);
router.put('/disponibilidades/:idDisponibilidad', updateDisponibilidad);
router.delete('/disponibilidades/:idDisponibilidad', deleteDisponibilidad);

export default router;
