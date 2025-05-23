import { Router } from 'express';
import { loginController, changePasswordController } from '../controllers/auth.controller'; // Adjust the path as needed

const router = Router();

// User login
router.post('/login', loginController);

// Change user password
router.post('/change-password', changePasswordController);

export default router;