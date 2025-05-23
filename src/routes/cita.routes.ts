import { Router } from 'express';
import {
    getCitas,
    getCita,
    getCitasByPaciente,
    getCitasByProfesional,
    createCita,
    updateCita,
    updateEstadoCita,
    deleteCita,
} from '../controllers/cita.controller'; // Adjust the path as needed

const router = Router();

// GET all citas
router.get('/', getCitas);
router.get('/:idCita', getCita);
router.get('/paciente/:idPaciente', getCitasByPaciente);
router.get('/profesional/:idProfesional', getCitasByProfesional);
router.post('/', createCita);
router.put('/:idCita', updateCita);
router.patch('/estado/:idCita', updateEstadoCita); // Using PATCH for partial update (status only)
router.delete('/:idCita', deleteCita);

export default router;