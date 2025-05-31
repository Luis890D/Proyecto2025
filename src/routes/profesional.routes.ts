import { Router } from "express";
import {
  getProfesionales,
  getProfesional,
  createProfesional,
  updateProfesional,
  deleteProfesional,
  getVistaProfesionales,
  registrarProfesional
} from "../controllers/Profesional.controller";

const router = Router();

router.get("/", getProfesionales);
router.get("/:id", getProfesional);
router.post("/", createProfesional);
router.post("/registrar", registrarProfesional); // Nueva ruta con procedimiento
router.put("/:id", updateProfesional);
router.delete("/:id", deleteProfesional);

// Ruta para la vista de profesionales
router.get("/vista/completa", getVistaProfesionales);

export default router;