import app from './app.js';

// Definir el puerto usando variables de entorno o valor predeterminado
const PORT = process.env.PORT || 5000;

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor iniciado correctamente en el puerto ${PORT}`);
  console.log(`API disponible en: http://localhost:${PORT}/api/openai`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
});

// Manejar errores del servidor
server.on('error', (error) => {
  console.error('❌ Error en el servidor:', error);
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ El puerto ${PORT} ya está en uso. Intenta con otro puerto.`);
  }
});

