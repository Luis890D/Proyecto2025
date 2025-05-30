import { Router } from "express";
import {
  getAsistentes,
  getAsistente,
  createAsistente,
  updateAsistente,
  deleteAsistente,
} from "../controllers/Asistentes.controller";
 
const router = Router();

// GET: Obtener todos los asistentes
router.get("/", getAsistentes);

// GET: Obtener un asistente por ID
router.get("/:id", getAsistente);

// POST: Crear un nuevo asistente
router.post("/", createAsistente);

// PUT: Actualizar un asistente por ID
router.put("/:id", updateAsistente);

// DELETE: Eliminar un asistente por ID
router.delete("/:id", deleteAsistente);

export default router;
