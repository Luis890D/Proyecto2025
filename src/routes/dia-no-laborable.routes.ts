import { Router } from 'express';
import {
    getDiasNoLaborables,
    createDiaNoLaborable,
    deleteDiaNoLaborable,
    checkDiaNoLaborable
} from '../controllers/dia-no-laborable.controller';

const router = Router();

// Rutas de Día No Laborable
router.get('/dias-no-laborables/:idProfesional', getDiasNoLaborables);
router.post('/dias-no-laborables', createDiaNoLaborable);
router.delete('/dias-no-laborables/:idDiaNoLaborable', deleteDiaNoLaborable);
router.get('/dias-no-laborables/check/:idProfesional', checkDiaNoLaborable);

export default router;
