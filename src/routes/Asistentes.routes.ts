import { Router } from "express";
import {
  getAsistentes,
  getAsistente,
  createAsistente,
  updateAsistente,
  deleteAsistente,
  getVistaAsistentes,
  registrarAsistente
} from "../controllers/Asistentes.controller";

const router = Router();

router.get("/", getAsistentes);
router.get("/:id", getAsistente);
router.post("/", createAsistente);
router.post("/registrar", registrarAsistente); // Nueva ruta para registro con procedimiento
router.put("/:id", updateAsistente);
router.delete("/:id", deleteAsistente);

// Ruta para la vista de asistentes
router.get("/vista/completa", getVistaAsistentes);

export default router;