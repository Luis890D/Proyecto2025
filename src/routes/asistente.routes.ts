import { Router } from 'express';
import {
    getAsistentes,
    getAsistente,
    createAsistente,
    updateAsistente,
    deleteAsistente
} from '../controllers/asistente.controller';
const router = Router();
// Rutas de Asistente
router.get('/asistentes', getAsistentes);
router.get('/asistentes/:idAsistente', getAsistente);
router.post('/asistentes', createAsistente);
router.put('/asistentes/:idAsistente', updateAsistente);
router.delete('/asistentes/:idAsistente', deleteAsistente);
export default router;