import { Router } from "express";
import {
  getHorarios,
  getHorario,
  createHorario,
  updateHorario,
  deleteHorario,
} from "../controllers/Horario.controller";

const router = Router();

// Obtener todos los horarios
router.get("/", getHorarios);

// Obtener horario por ID
router.get("/:id", getHorario);

// Crear nuevo horario
router.post("/", createHorario);

// Actualizar horario existente
router.put("/:id", updateHorario);

// Eliminar horario por ID
router.delete("/:id", deleteHorario);

export default router;
