# Guía de Instalación Rápida - Chatbot Valle Backend

Sigue estos pasos para configurar y ejecutar el backend del Chatbot Valle rápidamente.

## 1. Requisitos Previos

Asegúrate de tener instalado:
- Node.js (v16.x o superior)
- npm (viene con Node.js)
- Una clave API de OpenAI

## 2. Instalación

### Instalar todas las dependencias
```bash
npm install
```

## 3. Configuración

### Crear archivo .env
Crea un archivo llamado `.env` en la carpeta raíz del proyecto con este contenido:
```
OPENAI_API_KEY="tu-clave-api-de-openai"
PORT=3500
```

Reemplaza `"tu-clave-api-de-openai"` con tu clave API real de OpenAI.

## 4. Iniciar el Servidor

### Para desarrollo (con recarga automática)
```bash
npm run dev
```

### Para producción
```bash
npm start
```

## 5. Verificación

Abre tu navegador y visita:
- http://localhost:3500/test

Deberías ver un mensaje de confirmación indicando que el servidor está funcionando.

## 6. Integración con Frontend

El backend está configurado para aceptar solicitudes desde cualquier origen durante el desarrollo.

La URL del endpoint principal para el chatbot es:
- http://localhost:3500/api/openai

## 7. Solución de Problemas

Si encuentras algún problema durante la instalación o ejecución:

1. Verifica que todos los requisitos previos estén instalados correctamente
2. Asegúrate de que la clave API de OpenAI sea válida
3. Comprueba que el puerto 3500 no esté siendo utilizado por otra aplicación
4. Revisa los mensajes de error en la consola para más detalles

---

Para más información y documentación detallada, consulta el archivo README.md
