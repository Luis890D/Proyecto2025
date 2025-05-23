import { Router } from 'express';
import {
    getDiasNoLaborables,
    createDiaNoLaborable,
    deleteDiaNoLaborable,
    checkDiaNoLaborable,
} from '../controllers/dia-no-laborable.controller'; 

const router = Router();

router.get('/profesional/:idProfesional', getDiasNoLaborables);
router.post('/', createDiaNoLaborable);
router.delete('/:idDiaNoLaborable', deleteDiaNoLaborable);
router.get('/check/:idProfesional', checkDiaNoLaborable); 

export default router;