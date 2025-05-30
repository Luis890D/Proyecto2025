import { Request, Response } from "express";
import {
  srvCreateRole,
  srvDeleteRole,
  srvGetRoleByID,
  srvGetRoles,
  srvUpdateRole,
} from "../services/Role.service";

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await srvGetRoles();
     res.status(200).json(roles);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener roles" });
  }
};

export const getRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const role = await srvGetRoleByID(parseInt(id));
    if (!role) {
       res.status(404).json({ message: "Rol no encontrado" });
    }
     res.status(200).json(role);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener rol" });
  }
};

export const createRole = async (req: Request, res: Response) => {
  const { description } = req.body;
  try {
    const newRole = await srvCreateRole(description);
     res.status(201).json(newRole);
  } catch (error) {
     res.status(500).json({ message: "Error al crear rol" });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, estadoRole } = req.body;
  try {
    const updatedRole = await srvUpdateRole(
      parseInt(id),
      description,
      estadoRole
    );
    if (!updatedRole) {
       res.status(404).json({ message: "Rol no encontrado" });
    }
     res.status(200).json(updatedRole);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar rol" });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedRole = await srvDeleteRole(parseInt(id));
    if (!deletedRole) {
       res.status(404).json({ message: "Rol no encontrado" });
    }
     res.status(200).json(deletedRole);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar rol" });
  }
};