// controllers/usuarioController.ts
import { Request, Response } from 'express';
import { srvLogin, srvChangePassword } from '../services/usuario.service';

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const usuario = await srvLogin(email, password);
        res.status(200).json(usuario);
    } catch (error: any) {
        res.status(401).json({ error: error.message });
    }
};

export const changePasswordController = async (req: Request, res: Response) => {
    const { idUsuario } = req.body; // Puedes obtenerlo del token también si tienes autenticación
    const { currentPassword, newPassword } = req.body;

    try {
        await srvChangePassword(idUsuario, currentPassword, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada exitosamente' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
