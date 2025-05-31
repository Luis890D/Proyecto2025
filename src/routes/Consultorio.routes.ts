import { Router } from "express";
import {
  getConsultorios,
  getConsultorio,
  createConsultorio,
  updateConsultorio,
  deleteConsultorio,
  getVistaConsultorios
} from "../controllers/Consultorio.controller";

const router = Router();

router.get("/", getConsultorios);
router.get("/:id", getConsultorio);
router.post("/", createConsultorio);
router.put("/:id", updateConsultorio);
router.delete("/:id", deleteConsultorio);

// Nueva ruta para la vista de consultorios
router.get("/vista/completa", getVistaConsultorios);

export default router;