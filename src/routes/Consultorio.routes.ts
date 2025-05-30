import { Router } from "express";
import {
  getConsultorios,
  getConsultorio,
  createConsultorio,
  updateConsultorio,
  deleteConsultorio,
} from "../controllers/Consultorio.controller";

const router = Router();

// Obtener todos los consultorios
router.get("/", getConsultorios);

// Obtener un consultorio por ID
router.get("/:id", getConsultorio);

// Crear un nuevo consultorio
router.post("/", createConsultorio);

// Actualizar consultorio
router.put("/:id", updateConsultorio);

// Eliminar consultorio
router.delete("/:id", deleteConsultorio);

export default router;
