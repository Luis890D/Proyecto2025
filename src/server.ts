import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

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


app.listen(PORT, () => {
    console.log('Hola desde el servidor Express, Actualizado')
})

