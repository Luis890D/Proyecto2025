import { Router } from 'express';
import {
    getDisponibilidades,
    getDisponibilidad,
    createDisponibilidad,
    updateDisponibilidad,
    deleteDisponibilidad,
} from '../controllers/disponibilidad.controller'; // Adjust the path as needed

const router = Router();

router.get('/profesional/:idProfesional', getDisponibilidades);
router.get('/:idDisponibilidad', getDisponibilidad);
router.post('/', createDisponibilidad);
router.put('/:idDisponibilidad', updateDisponibilidad);
router.delete('/:idDisponibilidad', deleteDisponibilidad);

export default router;