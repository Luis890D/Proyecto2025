import { Request, Response } from "express";
import { srvLogin, srvChangePassword } from "../services/auth.service"; // Asegúrate de que la ruta al servicio sea correcta
import { Usuario } from "../entities/usuarios"; // Importa la entidad Usuario si la necesitas para tipado

// Controlador para el inicio de sesión de un usuario
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const userData = await srvLogin(email, password);
        res.status(200).json(userData);
    } catch (error: any) {
        console.error('Error al iniciar sesión:', error.message);
        if (error.message === 'Usuario no encontrado o inactivo') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'Credenciales inválidas') {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor al iniciar sesión' });
    }
};

// Controlador para que un usuario autenticado cambie su contraseña
export const changePassword = async (req: Request, res: Response) => {
    const { currentPassword, newPassword } = req.body;
    // Asumimos que el middleware de autenticación ya ha colocado el ID del usuario en req.userId
    const userId = req.userId; // Deberías obtener el ID del usuario autenticado desde el middleware

    if (!userId) {
        return res.status(401).json({ message: 'No autorizado' });
    }

    try {
        const result = await srvChangePassword(userId as number, currentPassword, newPassword);
        res.status(200).json(result);
    } catch (error: any) {
        console.error('Error al cambiar la contraseña:', error.message);
        if (error.message === 'Usuario no encontrado') {
            return res.status(404).json({ message: error.message });
        } else if (error.message === 'Contraseña actual incorrecta') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error interno del servidor al cambiar la contraseña' });
    }
};