import { AppDataSource } from "../config/db";
import { Role } from "../entities/Role";

const roleRepository = AppDataSource.getRepository(Role);

// Obtener todos los roles
export const srvGetRoles = async () => {
    const roles = await roleRepository.find({
        order: { description: 'ASC' }
    });
    return roles;
}

// Crear un nuevo rol
export const srvCreateRole = async (description: string) => {
    const newRole = new Role();
    newRole.description = description;

    return await roleRepository.save(newRole);
}

// Obtener un rol por ID
export const srvGetRoleByID = async (pIdRole: number) => {
    const role = await roleRepository.findOne({
        where: { roleId: pIdRole }
    });
    return role;
}

// Actualizar rol
export const srvUpdateRole = async (
    pIdRole: number,
    description: string,
    estadoRole: boolean
) => {
    const role = await roleRepository.findOne({
        where: { roleId: pIdRole }
    });

    if (!role) return null;

    role.description = description;
    role.estadoRole = estadoRole;

    return await roleRepository.save(role);
}

// Eliminar rol (cambio de estado)
export const srvDeleteRole = async (pIdRole: number) => {
    const role = await roleRepository.findOne({
        where: { roleId: pIdRole }
    });

    if (!role) return null;

    role.estadoRole = false;
    return await roleRepository.save(role);
}