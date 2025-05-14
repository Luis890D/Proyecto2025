import { AppDataSource } from "../config/db";
import { Usuario } from "../entities/usuarios";

const usuarioRepository = AppDataSource.getRepository(Usuario);

export const srvGetUsuarios = async () => {
    return await usuarioRepository.find({
        order: { nombre: 'ASC' }
    });
}

export const srvGetUsuarioByID = async (idUsuario: number) => {
    return await usuarioRepository.findOne({
        where: { idUsuario }
    });
}

export const srvCreateUsuario = async (usuarioData: {
    nombre: string;
    email: string;
    password: string;
    rol: 'profesional' | 'asistente';
}) => {
    const nuevoUsuario = new Usuario();
    Object.assign(nuevoUsuario, usuarioData);
    return await usuarioRepository.save(nuevoUsuario);
}

export const srvUpdateUsuario = async (idUsuario: number, updateData: Partial<Usuario>) => {
    const usuario = await usuarioRepository.findOne({ where: { idUsuario } });
    if (!usuario) return null;
    Object.assign(usuario, updateData);
    return await usuarioRepository.save(usuario);
}

export const srvDeleteUsuario = async (idUsuario: number) => {
    const usuario = await usuarioRepository.findOne({ where: { idUsuario } });
    if (!usuario) return null;
    return await usuarioRepository.remove(usuario);
}

export const srvGetUsuarioByEmail = async (email: string) => {
    return await usuarioRepository.findOne({ where: { email } });
}