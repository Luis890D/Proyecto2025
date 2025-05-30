import { Router } from "express";
import {
  getEspecialidades,
  getEspecialidad,
  createEspecialidad,
  updateEspecialidad,
  deleteEspecialidad,
} from "../controllers/Especialidad.controller";

const router = Router();

// Obtener todas las especialidades
router.get("/", getEspecialidades);

// Obtener una especialidad por ID
router.get("/:id", getEspecialidad);

// Crear una nueva especialidad
router.post("/", createEspecialidad);

// Actualizar una especialidad
router.put("/:id", updateEspecialidad);

// Eliminar una especialidad
router.delete("/:id", deleteEspecialidad);

export default router;
