import { AppDataSource } from "../config/db";
import { Usuario } from "../entities/usuarios";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const srvLogin = async (email: string, password: string) => {
    const usuario = await AppDataSource.getRepository(Usuario).findOne({ 
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
}

export const srvChangePassword = async (idUsuario: number, currentPassword: string, newPassword: string) => {
    const usuario = await AppDataSource.getRepository(Usuario).findOne({ 
        where: { idUsuario },
        select: ['idUsuario', 'password']
    });
    
    if (!usuario) throw new Error('Usuario no encontrado');
    
    const passwordMatch = await bcrypt.compare(currentPassword, usuario.password);
    if (!passwordMatch) throw new Error('Contraseña actual incorrecta');
    
    usuario.password = await bcrypt.hash(newPassword, 10);
    await AppDataSource.getRepository(Usuario).save(usuario);
    
    return { success: true };
}