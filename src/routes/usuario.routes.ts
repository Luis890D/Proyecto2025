import { Router } from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioByEmail
} from "../controllers/usuario.controller";

const router = Router();

// Rutas para usuarios
router.get('/', getUsuarios);
router.get('/:idUsuario', getUsuario);
router.get('/email/:email', getUsuarioByEmail);
router.post('/', createUsuario);
router.put('/:idUsuario', updateUsuario);
router.delete('/:idUsuario', deleteUsuario);

export default router;