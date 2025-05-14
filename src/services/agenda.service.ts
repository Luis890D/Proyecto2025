import { AppDataSource } from "../config/db";
import { Profesional } from "../entities/profesional";
import { Disponibilidad } from "../entities/disponibilidad";
import { Cita } from "../entities/cita";
import { DiaNoLaborable } from "../entities/dia_no_laborable";
import { Between, Not } from "typeorm";

export const srvGetAgendaProfesional = async (idProfesional: number, fechaInicio: Date, fechaFin: Date) => {
    const profesional = await AppDataSource.getRepository(Profesional).findOne({ 
        where: { idProfesional },
        relations: ['usuario']
    });
    if (!profesional) throw new Error('Profesional no encontrado');

    const disponibilidades = await AppDataSource.getRepository(Disponibilidad).find({
        where: {
            idProfesional,
            fecha: Between(fechaInicio, fechaFin)
        },
        order: { fecha: 'ASC', horaInicio: 'ASC' }
    });

    const citas = await AppDataSource.getRepository(Cita).find({
        where: {
            idProfesional,
            fecha: Between(fechaInicio, fechaFin),
            estado: Not('cancelada')
        },
        relations: ['paciente'],
        order: { fecha: 'ASC', hora: 'ASC' }
    });

    const diasNoLaborables = await AppDataSource.getRepository(DiaNoLaborable).find({
        where: {
            idProfesional,
            fecha: Between(fechaInicio, fechaFin)
        }
    });

    return {
        profesional,
        disponibilidades,
        citas,
        diasNoLaborables
    };
}

export const srvGetHorariosDisponibles = async (idProfesional: number, fecha: Date) => {
    // Verificar si es día no laborable
    const diaNoLaborable = await AppDataSource.getRepository(DiaNoLaborable).findOne({
        where: { idProfesional, fecha }
    });
    if (diaNoLaborable) return [];

    // Obtener disponibilidades para ese día
    const disponibilidades = await AppDataSource.getRepository(Disponibilidad).find({
        where: { idProfesional, fecha, disponible: true }
    });

    // Obtener citas programadas para ese día
    const citas = await AppDataSource.getRepository(Cita).find({
        where: { idProfesional, fecha, estado: Not('cancelada') }
    });

    // Calcular horarios disponibles
    const horariosDisponibles: string[] = [];
    
    disponibilidades.forEach(disp => {
        let horaActual = new Date(`${fecha.toISOString().split('T')[0]}T${disp.horaInicio}`);
        const horaFin = new Date(`${fecha.toISOString().split('T')[0]}T${disp.horaFin}`);
        
        while (horaActual < horaFin) {
            const horaStr = horaActual.toTimeString().substring(0, 5);
            const citaExistente = citas.find(c => c.hora.substring(0, 5) === horaStr);
            
            if (!citaExistente) {
                horariosDisponibles.push(horaStr);
            }
            
            // Añadir 30 minutos (puedes ajustar este intervalo)
            horaActual = new Date(horaActual.getTime() + 30 * 60000);
        }
    });

    return horariosDisponibles;
}