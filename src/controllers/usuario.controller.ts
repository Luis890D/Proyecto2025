import { Request, Response } from "express";
import {
    srvGetUsuarios,
    srvGetUsuarioByID,
    srvCreateUsuario,
    srvUpdateUsuario,
    srvDeleteUsuario,
    srvGetUsuarioByEmail,
} from "../services/usuario.service"; // Asegúrate de que la ruta al servicio sea correcta
import * as bcrypt from 'bcrypt';

// OBTENER TODOS LOS USUARIOS
export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await srvGetUsuarios();
        res.status(200).json(usuarios);
    } catch (error: any) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener los usuarios.' });
    }
};

// OBTENER UN USUARIO POR ID
export const getUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.params;
    try {
        const usuario = await srvGetUsuarioByID(+idUsuario);
        if (!usuario) {
            return res.status(404).json({ message: `No se encontró el usuario con ID ${idUsuario}` });
        }
        res.status(200).json(usuario);
    } catch (error: any) {
        console.error('Error al obtener el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el usuario.' });
    }
};

// CREAR UN NUEVO USUARIO
export const createUsuario = async (req: Request, res: Response) => {
    try {
        const { password, ...userData } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const nuevoUsuario = await srvCreateUsuario({ ...userData, password: hashedPassword });
        res.status(201).json(nuevoUsuario);
    } catch (error: any) {
        console.error('Error al crear el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al crear el usuario.' });
    }
};

// ACTUALIZAR UN USUARIO
export const updateUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.params;
    try {
        const usuarioActualizado = await srvUpdateUsuario(+idUsuario, req.body);
        if (!usuarioActualizado) {
            return res.status(404).json({ message: `No se encontró el usuario con ID ${idUsuario}` });
        }
        res.status(200).json(usuarioActualizado);
    } catch (error: any) {
        console.error('Error al actualizar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al actualizar el usuario.' });
    }
};

// ELIMINAR UN USUARIO
export const deleteUsuario = async (req: Request, res: Response) => {
    const { idUsuario } = req.params;
    try {
        const resultado = await srvDeleteUsuario(+idUsuario);
        if (!resultado) {
            return res.status(404).json({ message: `No se encontró el usuario con ID ${idUsuario}` });
        }
        res.status(200).json({ message: `Usuario con ID ${idUsuario} eliminado correctamente.` });
    } catch (error: any) {
        console.error('Error al eliminar el usuario:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al eliminar el usuario.' });
    }
};

// OBTENER UN USUARIO POR EMAIL
export const getUsuarioByEmail = async (req: Request, res: Response) => {
    const { email } = req.params;
    try {
        const usuario = await srvGetUsuarioByEmail(email);
        if (!usuario) {
            return res.status(404).json({ message: `No se encontró el usuario con email ${email}` });
        }
        res.status(200).json(usuario);
    } catch (error: any) {
        console.error('Error al obtener el usuario por email:', error.message);
        res.status(500).json({ message: 'Error interno del servidor al obtener el usuario por email.' });
    }
};