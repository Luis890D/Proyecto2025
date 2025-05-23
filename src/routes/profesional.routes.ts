import { Router } from "express";
import {
    getProfesionales,
    getProfesional,
    createProfesional,
    updateProfesional,
    deleteProfesional
} from "../controllers/profesional.controller";

const router = Router();

// Rutas para profesionales
router.get('/', getProfesionales);
router.get('/:idProfesional', getProfesional);
router.post('/', createProfesional);
router.put('/:idProfesional', updateProfesional);
router.delete('/:idProfesional', deleteProfesional);

export default router;