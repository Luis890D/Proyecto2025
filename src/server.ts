import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Importar rutas
import agendaRoutes from './routes/agende.routes';
import asistenteRoutes from './routes/asistente.routes';
import expedienteRoutes from './routes/expediente.routes';
import reportesRoutes from './routes/reportes.routes';
import usuarioRoutes from './routes/usuario.routes';
import disponibilidadRoutes from './routes/disponibilidad.routes';
import diaNoLaborableRoutes from './routes/dia-no-laborable.routes';
import pacienteRoutes from './routes/paciente.routes';
import authRoutes from './routes/auth.routes';
import citaRoutes from './routes/cita.routes';
import historialCitaRoutes from './routes/historial-cita.routes';
import profesionalRoutes from './routes/profesional.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Usar las rutas

app.use('/api/usuarios', usuarioRoutes);

app.use('/api/pacientes', pacienteRoutes);

app.use('/api/profesionales', profesionalRoutes);

app.use('/api/asistente', asistenteRoutes);
//Revision al final 6:30 // resuelto 9:14

app.use('/api/citas', citaRoutes)

app.use('/api/dias-no-laborables', diaNoLaborableRoutes);

app.use('/api/disponibilidades', disponibilidadRoutes);

app.use('/api/agenda', agendaRoutes);//falta probar 7:23 // resuelto 9:19

app.use('/api/expedientes', expedienteRoutes)

app.use('/api/reportes', reportesRoutes);//falta probar 8:14 // Get sive pero me imagino que falta datos a completar para llenar reportes

app.use('/api/historial', historialCitaRoutes); // Revision al final 9:15 // Get sive pero me imagino que falta datos a completar para llenar reportes

app.listen(PORT, () => {
    console.log('Hola desde el servidor Express, Actualizado');
});

connectDB();

// Ruta raíz para comprobar que el servidor está activo
app.get('/', (req: Request, res: Response) => {
    res.send('¡Servidor Express funcionando correctamente! 🌐');
});