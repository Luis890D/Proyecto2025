import { Router } from 'express';
import {
    getProfesionales,
    getProfesional,
    createProfesional,
    updateProfesional,
    deleteProfesional
} from '../controllers/profesional.controller';

const router = Router();

// Rutas de Profesional
router.get('/profesionales', getProfesionales);
router.get('/profesionales/:idProfesional', getProfesional);
router.post('/profesionales', createProfesional);
router.put('/profesionales/:idProfesional', updateProfesional);
router.delete('/profesionales/:idProfesional', deleteProfesional);

export default router;
