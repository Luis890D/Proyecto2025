import { Router } from "express";
import {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/Role.controller";

const router = Router();

router.get("/", getRoles);               // Obtener todos los roles
router.get("/:id", getRole);             // Obtener un rol por ID
router.post("/", createRole);            // Crear un nuevo rol
router.put("/:id", updateRole);          // Actualizar un rol existente
router.delete("/:id", deleteRole);       // Eliminar un rol

export default router;
