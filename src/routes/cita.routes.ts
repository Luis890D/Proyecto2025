import { Router } from "express";
import {
  getCitas,
  getCita,
  createCita,
  updateCita,
  deleteCita,
  getVistaCitas,
  insertarCitaValidandoHorario,
  actualizarCitaValidandoHorario
} from "../controllers/Cita.controller";

const router = Router();

router.get("/", getCitas);
router.get("/:id", getCita);
router.post("/", createCita);
router.post("/validar-horario", insertarCitaValidandoHorario); // Nueva ruta
router.put("/:id", updateCita);
router.put("/:id/validar-horario", actualizarCitaValidandoHorario); // Nueva ruta
router.delete("/:id", deleteCita);

// Ruta para la vista de citas
router.get("/vista/completa", getVistaCitas);

export default router;