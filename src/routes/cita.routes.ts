import { Router } from "express";
import {
  getCitas,
  getCita,
  createCita,
  updateCita,
  deleteCita,
} from "../controllers/Cita.controller";

const router = Router();

// GET: Obtener todas las citas
router.get("/", getCitas);

// GET: Obtener una cita por ID
router.get("/:id", getCita);

// POST: Crear una nueva cita
router.post("/", createCita);

// PUT: Actualizar una cita existente
router.put("/:id", updateCita);

// DELETE: Eliminar una cita por ID
router.delete("/:id", deleteCita);

export default router;
