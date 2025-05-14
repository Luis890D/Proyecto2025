import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Usuario } from '../entities/usuarios';
import { Asistente } from '../entities/asistente';
import { Profesional } from '../entities/profesional';
import { Paciente } from '../entities/paciente';
import { Disponibilidad } from '../entities/disponibilidad';
import { DiaNoLaborable } from '../entities/dia_no_laborable';
import { Cita } from '../entities/cita';
import { Expediente } from '../entities/expediente';
import { HistorialCita } from '../entities/historial_citas';
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
    entities: [Usuario,
        Asistente,
        Profesional,
        Paciente,
        Disponibilidad,
        DiaNoLaborable,
        Cita,
        Expediente,
        HistorialCita]
});

export const connectDD = async () => {
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