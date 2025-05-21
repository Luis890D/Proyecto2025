import { Router } from 'express';
import {
    getCitas,
    getCita,
    getCitasByPaciente,
    getCitasByProfesional,
    createCita,
    updateCita,
    updateEstadoCita,
    deleteCita
} from '../controllers/cita.controller';

const router = Router();

// Rutas de Cita
router.get('/citas', getCitas);
router.get('/citas/:idCita', getCita);
router.get('/citas/paciente/:idPaciente', getCitasByPaciente);
router.get('/citas/profesional/:idProfesional', getCitasByProfesional);
router.post('/citas', createCita);
router.put('/citas/:idCita', updateCita);
router.put('/citas/estado/:idCita', updateEstadoCita);
router.delete('/citas/:idCita', deleteCita);

export default router;
