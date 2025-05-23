import { Router } from "express";
import {
    getPacientes,
    getPaciente,
    getPacienteByDPI,
    createPaciente,
    updatePaciente,
    deletePaciente
} from "../controllers/paciente.controller";

const router = Router();

// Rutas para pacientes
router.get('/', getPacientes);
router.get('/:idPaciente', getPaciente);
router.get('/dpi/:dpi', getPacienteByDPI);
router.post('/', createPaciente);
router.put('/:idPaciente', updatePaciente);
router.delete('/:idPaciente', deletePaciente);

export default router;