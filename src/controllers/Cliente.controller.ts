import { Request, Response } from "express";
import {
  srvCreateCliente,
  srvDeleteCliente,
  srvGetClienteById,
  srvGetClientes,
  srvUpdateClienteEstado,
} from "../services/Cliente.service";
import { User } from "../entities/User";

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await srvGetClientes();
     res.status(200).json(clientes);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener clientes" });
  }
};

export const getCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await srvGetClienteById(parseInt(id));
    if (!cliente) {
       res.status(404).json({ message: "Cliente no encontrado" });
    }
     res.status(200).json(cliente);
  } catch (error) {
     res.status(500).json({ message: "Error al obtener cliente" });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  const { user } = req.body;
  try {
    const newCliente = await srvCreateCliente(user as User);
     res.status(201).json(newCliente);
  } catch (error) {
     res.status(500).json({ message: "Error al crear cliente" });
  }
};

export const updateClienteEstado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const updatedCliente = await srvUpdateClienteEstado(parseInt(id), estado);
    if (!updatedCliente) {
       res.status(404).json({ message: "Cliente no encontrado" });
    }
     res.status(200).json(updatedCliente);
  } catch (error) {
     res.status(500).json({ message: "Error al actualizar cliente" });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCliente = await srvDeleteCliente(parseInt(id));
    if (!deletedCliente) {
       res.status(404).json({ message: "Cliente no encontrado" });
    }
     res.status(200).json(deletedCliente);
  } catch (error) {
     res.status(500).json({ message: "Error al eliminar cliente" });
  }
};