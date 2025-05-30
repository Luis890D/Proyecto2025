import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Asistente } from '../entities/Asistentes';
import { Cita } from '../entities/Cita';
import { Cliente } from '../entities/Cliente';
import { Consultorio } from '../entities/Consultorio';
import { Especialidad } from '../entities/Especialidad';
import { Expediente } from '../entities/Expediente';
import { Horario } from '../entities/Horario';
import { Profesional } from '../entities/Profesional';
import { Role } from '../entities/Role';
import { User } from '../entities/User';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [ Asistente,
         Cita, Cliente, Consultorio, 
         Especialidad, Expediente, Horario, 
         Profesional, Role, User]
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.log(process.env.DB_HOST)
        console.log(process.env.DB_PORT)
        console.log(process.env.DB_USER)
        console.log(process.env.DB_PASS)
        console.log(process.env.DB_NAME)

        console.log('Error al Conectarse a la base de datos', error);
    }
}


// Hola Eddy