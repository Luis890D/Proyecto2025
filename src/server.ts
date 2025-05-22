import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

// Importar rutas
import agendaRoutes from './routes/agende.routes';
import asistenteRoutes from './routes/asistente.routes';
import expedienteRoutes from './routes/expediente.routes';
import informesRoutes from './routes/informes.routes';
import usuarioRoutes from './routes/usuario.routes';
import disponibilidadRoutes from './routes/disponibilidad.routes';
import diaNoLaborableRoutes from './routes/dia-no-laborable.routes';
import pacienteRoutes from './routes/paciente.routes';
import authRoutes from './routes/auth.routes';
import citaRoutes from './routes/cita.routes';
import historialCitaRoutes from './routes/historial-cita.routes';
import profesionalesRoutes from './routes/profesionales.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

// Ruta raíz para comprobar que el servidor está activo
app.get('/', (req: Request, res: Response) => {
    res.send('¡Servidor Express funcionando correctamente! 🌐');
});

// Usar las rutas
app.use('/api', agendaRoutes);
app.use('/api', asistenteRoutes);
app.use('/api', expedienteRoutes);
app.use('/api', informesRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', disponibilidadRoutes);
app.use('/api', diaNoLaborableRoutes);
app.use('/api', pacienteRoutes);
app.use('/api', authRoutes);
app.use('/api', citaRoutes);
app.use('/api', historialCitaRoutes);
app.use('/api', profesionalesRoutes);

app.listen(PORT, () => {
    console.log('Hola desde el servidor Express, Actualizado');
});
