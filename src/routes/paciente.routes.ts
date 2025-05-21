import { Router } from 'express';
import {
    getPacientes,
    getPaciente,
    getPacienteByDPI,
    createPaciente,
    updatePaciente,
    deletePaciente
} from '../controllers/paciente.controller';

const router = Router();

// Rutas de Paciente
router.get('/pacientes', getPacientes);
router.get('/pacientes/:idPaciente', getPaciente);
router.get('/pacientes/dpi/:dpi', getPacienteByDPI);
router.post('/pacientes', createPaciente);
router.put('/pacientes/:idPaciente', updatePaciente);
router.delete('/pacientes/:idPaciente', deletePaciente);

export default router;
