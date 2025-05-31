import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  registrarUsuario,
  loginUsuario
} from "../controllers/User.controller";

const router = Router();

router.get("/", getUsers);
router.get("/:dpi", getUser);
router.post("/", createUser);
router.post("/registrar", registrarUsuario); // Nueva ruta con procedimiento
router.post("/login", loginUsuario); // Nueva ruta de autenticación
router.put("/:dpi", updateUser);
router.delete("/:dpi", deleteUser);

export default router;