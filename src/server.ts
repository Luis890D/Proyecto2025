import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import clienteRoutes from "./routes/Cliente.routes";
import consultorioRoutes from "./routes/Consultorio.routes";
import especialidadRoutes from "./routes/Especialidad.routes";
import expedienteRoutes from "./routes/Expediente.routes";
import horarioRoutes from "./routes/Horario.routes";
import profesionalRoutes from "./routes/Profesional.routes";
import roleRoutes from "./routes/Role.routes";
import userRoutes from "./routes/User.routes";
import AsistentesRoutes from "./routes/Asistentes.routes";
import citasRoutes from "./routes/Cita.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../FrontEnd')));

// Rutas API
app.use("/api/citas", citasRoutes);
app.use("/api/asistentes", AsistentesRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/consultorios", consultorioRoutes);
app.use("/api/especialidades", especialidadRoutes);
app.use("/api/expedientes", expedienteRoutes);
app.use("/api/horarios", horarioRoutes);
app.use("/api/profesionales", profesionalRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);

// Servir el index.html en la raíz para la app frontend
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/index.html'));
});

// Conectar a la base de datos
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a la base de datos:', err);
  });
