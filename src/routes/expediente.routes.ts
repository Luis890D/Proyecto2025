import { Router } from "express";
import {
  getExpedientes,
  getExpediente,
  createExpediente,
  updateExpediente,
  deleteExpediente,
  getVistaExpedientes,
  getVistaExpedienteByCliente,
  crearExpediente,
  buscarExpediente
} from "../controllers/Expediente.controller";

const router = Router();

router.get("/", getExpedientes);
router.get("/buscar", buscarExpediente); // Nueva ruta de búsqueda
router.get("/:id", getExpediente);
router.post("/", createExpediente);
router.post("/crear", crearExpediente); // Nueva ruta con función PostgreSQL
router.put("/:id", updateExpediente);
router.delete("/:id", deleteExpediente);

// Rutas para las vistas de expedientes
router.get("/vista/completa", getVistaExpedientes);
router.get("/vista/cliente/:id", getVistaExpedienteByCliente);

export default router;