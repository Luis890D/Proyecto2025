import { Router } from "express";
import {
  getClientes,
  getCliente,
  createCliente,
  updateClienteEstado,
  deleteCliente,
  getVistaClientes,
  getVistaClientesExpedientes,
  getVistaClienteExpediente
} from "../controllers/Cliente.controller";

const router = Router();

router.get("/", getClientes);
router.get("/:id", getCliente);
router.post("/", createCliente);
router.patch("/:id/estado", updateClienteEstado);
router.delete("/:id", deleteCliente);

// Nuevas rutas para las vistas de clientes
router.get("/vista/completa", getVistaClientes);
router.get("/vista/expedientes", getVistaClientesExpedientes);
router.get("/vista/expedientes/:id", getVistaClienteExpediente);

export default router;