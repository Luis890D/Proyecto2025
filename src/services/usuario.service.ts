import { AppDataSource } from "../config/db";
import { Usuario } from "../entities/usuarios";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const usuarioRepository = AppDataSource.getRepository(Usuario);

// ✅ Obtener todos los usuarios
export const srvGetUsuarios = async () => {
    return await usuarioRepository.find({
        order: { nombre: 'ASC' }
    });
};

// ✅ Obtener usuario por ID
export const srvGetUsuarioByID = async (idUsuario: number) => {
    return await usuarioRepository.findOne({
        where: { idUsuario }
    });
};

// ✅ Obtener usuario por email
export const srvGetUsuarioByEmail = async (email: string) => {
    return await usuarioRepository.findOne({ where: { email } });
};

// ✅ Crear nuevo usuario
export const srvCreateUsuario = async (usuarioData: {
    nombre: string;
    email: string;
    password: string;
    rol: 'profesional' | 'asistente';
}) => {
    const nuevoUsuario = new Usuario();
    // Encriptar la contraseña antes de guardar
    nuevoUsuario.password = await bcrypt.hash(usuarioData.password, 10);
    Object.assign(nuevoUsuario, usuarioData);
    return await usuarioRepository.save(nuevoUsuario);
};

// ✅ Actualizar usuario
export const srvUpdateUsuario = async (idUsuario: number, updateData: Partial<Usuario>) => {
    const usuario = await usuarioRepository.findOne({ where: { idUsuario } });
    if (!usuario) return null;
    Object.assign(usuario, updateData);
    return await usuarioRepository.save(usuario);
};

// ✅ Eliminar usuario
export const srvDeleteUsuario = async (idUsuario: number) => {
    const usuario = await usuarioRepository.findOne({ where: { idUsuario } });
    if (!usuario) return null;
    return await usuarioRepository.remove(usuario);
};

// ✅ Login
export const srvLogin = async (email: string, password: string) => {
    const usuario = await usuarioRepository.findOne({
        where: { email },
        select: ['idUsuario', 'nombre', 'email', 'password', 'rol', 'activo']
    });

    if (!usuario || !usuario.activo) throw new Error('Usuario no encontrado o inactivo');

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
        { id: usuario.idUsuario, email: usuario.email, rol: usuario.rol },
        process.env.JWT_SECRET!,
        { expiresIn: '8h' }
    );

    return {
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        token
    };
};

// ✅ Cambio de contraseña
export const srvChangePassword = async (
    idUsuario: number,
    currentPassword: string,
    newPassword: string
) => {
    const usuario = await usuarioRepository.findOne({
        where: { idUsuario },
        select: ['idUsuario', 'password']
    });

    if (!usuario) throw new Error('Usuario no encontrado');

    const passwordMatch = await bcrypt.compare(currentPassword, usuario.password);
    if (!passwordMatch) throw new Error('Contraseña actual incorrecta');

    usuario.password = await bcrypt.hash(newPassword, 10);
    await usuarioRepository.save(usuario);

    return { success: true };
};
