import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/User.controller";

const router = Router();

router.get("/", getUsers);           // Obtener todos los usuarios
router.get("/:dpi", getUser);        // Obtener un usuario por DPI
router.post("/", createUser);        // Crear un nuevo usuario
router.put("/:dpi", updateUser);     // Actualizar un usuario por DPI
router.delete("/:dpi", deleteUser);  // Eliminar un usuario por DPI

export default router;
