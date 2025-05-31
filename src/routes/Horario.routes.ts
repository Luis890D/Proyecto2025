import { Router } from "express";
import {
  getHorarios,
  getHorario,
  createHorario,
  updateHorario,
  deleteHorario,
  getVistaHorariosProfesionales,
  getVistaHorariosByProfesional,
  insertarHorario,
  actualizarHorario
} from "../controllers/Horario.controller";

const router = Router();

router.get("/", getHorarios);
router.get("/:id", getHorario);
router.post("/", createHorario);
router.post("/insertar", insertarHorario); // Nueva ruta con función PostgreSQL
router.put("/:id", updateHorario);
router.put("/:id/actualizar", actualizarHorario); // Nueva ruta con función PostgreSQL
router.delete("/:id", deleteHorario);

// Rutas para las vistas de horarios
router.get("/vista/profesionales", getVistaHorariosProfesionales);
router.get("/vista/profesionales/:id", getVistaHorariosByProfesional);

export default router;