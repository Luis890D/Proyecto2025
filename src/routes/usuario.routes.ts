import { Router } from 'express';
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuarioByEmail
} from '../controllers/usuario.controller';

const router = Router();

// Rutas de Usuario
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:idUsuario', getUsuario);
router.post('/usuarios', createUsuario);
router.put('/usuarios/:idUsuario', updateUsuario);
router.delete('/usuarios/:idUsuario', deleteUsuario);
router.get('/usuarios/email/:email', getUsuarioByEmail);

export default router;
