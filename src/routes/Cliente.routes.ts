import { Router } from "express";
import {
  getClientes,
  getCliente,
  createCliente,
  updateClienteEstado,
  deleteCliente,
} from "../controllers/Cliente.controller";

const router = Router();

// Obtener todos los clientes
router.get("/", getClientes);

// Obtener un cliente por ID
router.get("/:id", getCliente);

// Crear un nuevo cliente
router.post("/", createCliente);

// Actualizar el estado de un cliente
router.patch("/:id/estado", updateClienteEstado);

// Eliminar un cliente por ID
router.delete("/:id", deleteCliente);

export default router;
