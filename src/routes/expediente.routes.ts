import { Router } from "express";
import {
  getExpedientes,
  getExpediente,
  createExpediente,
  updateExpediente,
  deleteExpediente,
} from "../controllers/Expediente.controller";

const router = Router();

// Obtener todos los expedientes
router.get("/", getExpedientes);

// Obtener expediente por ID
router.get("/:id", getExpediente);

// Crear nuevo expediente
router.post("/", createExpediente);

// Actualizar expediente existente
router.put("/:id", updateExpediente);

// Eliminar expediente por ID
router.delete("/:id", deleteExpediente);

export default router;
