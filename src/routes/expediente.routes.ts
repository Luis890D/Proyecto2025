import { Router } from 'express';
import {
    getExpedienteByCita,
    createExpediente,
    updateExpediente,
    getHistorialMedico,
} from '../controllers/expediente.controller'; // Adjust the path as needed

const router = Router();

// GET an expediente by cita ID
router.get('/cita/:idCita', getExpedienteByCita);

// CREATE a new expediente
router.post('/', createExpediente);

// UPDATE an expediente by ID
router.put('/:idExpediente', updateExpediente);

// GET a patient's medical history
router.get('/historial/:idPaciente', getHistorialMedico);

export default router;