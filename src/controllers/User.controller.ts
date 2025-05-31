import { Request, Response } from "express";
import {
  srvCreateUser,
  srvDeleteUser,
  srvGetUserByDPI,
  srvGetUsers,
  srvLoginUsuario,
  srvRegistrarUsuario,
  srvUpdateUser,
} from "../services/User.service";
import { Role } from "../entities/Role";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await srvGetUsers();
     res.status(200).json(users);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { dpi } = req.params;
  try {
    const user = await srvGetUserByDPI(parseInt(dpi));
    if (!user) {
       res.status(404).json({ message: "Usuario no encontrado" });
    }
     res.status(200).json(user);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const {
    role,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    email,
    telefono,
    celular,
  } = req.body;
  try {
    const newUser = await srvCreateUser(
      role as Role,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      email,
      telefono,
      celular
    );
     res.status(201).json(newUser);
  } catch (error) {
     res.status(500).json({ message: "Error al crear usuario" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { dpi } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await srvUpdateUser(parseInt(dpi), updateData);
    if (!updatedUser) {
       res.status(404).json({ message: "Usuario no encontrado" });
    }
     res.status(200).json(updatedUser);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { dpi } = req.params;
  try {
    const deletedUser = await srvDeleteUser(parseInt(dpi));
    if (!deletedUser) {
       res.status(404).json({ message: "Usuario no encontrado" });
    }
     res.status(200).json(deletedUser);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
// Añadir al final del archivo
export const registrarUsuario = async (req: Request, res: Response) => {
  const {
    dpi,
    role_id,
    primer_nombre,
    segundo_nombre,
    primer_apellido,
    segundo_apellido,
    email,
    telefono,
    celular
  } = req.body;

  try {
    await srvRegistrarUsuario(
      dpi,
      role_id,
      primer_nombre,
      segundo_nombre,
      primer_apellido,
      segundo_apellido,
      email,
      telefono,
      celular
    );
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error: any) {
    res.status(500).json({ 
      message: "Error al registrar usuario",
      error: error.message 
    });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { nombre_user, password } = req.body;
  
  try {
    const result = await srvLoginUsuario(nombre_user, password);
    if (!result) {
       res.status(401).json({ message: "Credenciales inválidas" });
    }
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({
      message: "Error en el login",
      error: error.message
    });
  }
};