import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { OpenAIRute } from './Routes.js';

// Cargar variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Configurar middleware CORS con opciones más permisivas para desarrollo
app.use(cors({
  origin: '*', // Permite cualquier origen en desarrollo
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsear JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware para logging de solicitudes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Ruta de prueba para verificar que el servidor está funcionando
app.get('/test', (req, res) => {
  console.log('Endpoint de prueba accedido');
  res.json({ message: 'El servidor está funcionando correctamente' });
});

// Rutas de la API de OpenAI
app.use('/api', OpenAIRute);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

export default app;

