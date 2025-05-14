import { AppDataSource } from "../config/db";
import { DiaNoLaborable } from "../entities/dia_no_laborable";

const diaNoLaborableRepository = AppDataSource.getRepository(DiaNoLaborable);

export const srvGetDiasNoLaborables = async (idProfesional: number) => {
    return await diaNoLaborableRepository.find({
        where: { idProfesional },
        order: { fecha: 'ASC' }
    });
}

export const srvCreateDiaNoLaborable = async (diaData: {
    idProfesional: number;
    fecha: Date;
    motivo?: string;
}) => {
    const nuevoDia = new DiaNoLaborable();
    Object.assign(nuevoDia, diaData);
    return await diaNoLaborableRepository.save(nuevoDia);
}

export const srvDeleteDiaNoLaborable = async (idDiaNoLaborable: number) => {
    const dia = await diaNoLaborableRepository.findOne({ where: { idDiaNoLaborable } });
    if (!dia) return null;
    return await diaNoLaborableRepository.remove(dia);
}

export const srvCheckDiaNoLaborable = async (idProfesional: number, fecha: Date) => {
    return await diaNoLaborableRepository.findOne({
        where: { idProfesional, fecha }
    });
}