import { Router } from 'express';
import {
    loginController,
    changePasswordController
} from '../controllers/auth.controller';
const router = Router();
// Rutas de Auth
router.post('/auth/login', loginController);
router.post('/auth/change-password', changePasswordController);
export default router;