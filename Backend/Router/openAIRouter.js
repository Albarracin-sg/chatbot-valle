// Módulo de rutas para la API de OpenAI
import express from 'express';
import { OpenAIController } from '../controllers/OpenAi.js';

// Router de Express para manejar las rutas de OpenAI
const router = express.Router();

// Ruta POST para procesar mensajes a través de la API de OpenAI
router.post('/openai', OpenAIController);

export default router;