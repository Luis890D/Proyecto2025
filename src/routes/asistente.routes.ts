import { Router } from 'express';
import {
    getAsistentes,
    getAsistente,
    createAsistente,
    updateAsistente,
    deleteAsistente
} from '../controllers/asistente.controller';

const router = Router();

// Rutas para Asistentes
router.get('/asistentes', getAsistentes);          // GET /api/asistente/asistentes
router.get('/asistentes/:idAsistente', getAsistente); // GET /api/asistente/asistentes/1
router.post('/asistentes', createAsistente);       // POST /api/asistente/asistentes
router.put('/asistentes/:idAsistente', updateAsistente); // PUT /api/asistente/asistentes/1
router.delete('/asistentes/:idAsistente', deleteAsistente); // DELETE /api/asistente/asistentes/1

export default router;