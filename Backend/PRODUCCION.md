# Guía para Despliegue en Producción - Chatbot Valle Backend

Este documento proporciona recomendaciones para desplegar el backend del Chatbot Valle en un entorno de producción de manera segura y eficiente.

## 1. Configuración del Entorno

### Variables de Entorno
- Asegúrate de configurar adecuadamente las variables de entorno en el servidor de producción, especialmente la clave API de OpenAI.
- Nunca incluyas el archivo `.env` en el control de versiones.
- Considera usar un servicio de gestión de secretos como AWS Secrets Manager, Hashicorp Vault, o las capacidades nativas de tu proveedor de hosting.

### Ejemplo de configuración en producción:
```
OPENAI_API_KEY="tu-clave-api-de-openai"
PORT=3500
NODE_ENV=production
```

## 2. Seguridad

### Configuración de CORS
Modifica la configuración CORS en `app.js` para permitir solo los orígenes específicos de tu frontend:

```javascript
app.use(cors({
  origin: ['https://tu-dominio-frontend.com', 'https://otra-url-permitida.com'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Implementar HTTPS
Siempre utiliza HTTPS en producción. Configura certificados SSL/TLS con servicios como Let's Encrypt.

### Limitar Tasa de Solicitudes
Implementa limitación de tasa para prevenir abusos:

```javascript
// Ejemplo usando express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limitar cada IP a 100 solicitudes por ventana
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
```

## 3. Despliegue

### Opciones de Hosting

#### Servicios de Contenedores
- **Docker**: Crea un Dockerfile para contenerizar la aplicación.
- **Kubernetes**: Para despliegues más complejos y escalabilidad.

#### Plataformas como Servicio (PaaS)
- **Heroku**: Fácil de configurar y con soporte para Node.js.
- **Render**: Alternativa moderna con configuración sencilla.
- **Railway**: Plataforma rápida para desplegar aplicaciones Node.js.
- **Fly.io**: Despliegue global con enfoque en rendimiento.

#### Serverless
- **AWS Lambda + API Gateway**: Ideal para cargas de trabajo variables.
- **Vercel**: Excelente para aplicaciones fullstack, especialmente con Next.js en el frontend.
- **Netlify Functions**: Si ya usas Netlify para el frontend.

#### VPS (Servidor Privado Virtual)
- **DigitalOcean**: Droplets configurables para tus necesidades.
- **Linode**: Alternativa competitiva con buen rendimiento.
- **AWS EC2**: Mayor control sobre la infraestructura.

## 4. Proceso de Despliegue

### Preparación
1. Asegúrate de que todas las dependencias estén correctamente definidas en `package.json`.
2. Verifica que `"type": "module"` esté presente para soportar imports de ES modules.
3. Confirma que el script `start` esté configurado correctamente.

### Proceso Manual Básico

1. Clona el repositorio en el servidor.
2. Instala las dependencias:
   ```bash
   npm ci --production
   ```
3. Configura las variables de entorno.
4. Inicia la aplicación:
   ```bash
   npm start
   ```

### Usando Process Manager (Recomendado)

Usa PM2 para mantener la aplicación funcionando:

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Iniciar la aplicación
pm2 start server.js --name "chatbot-valle-backend"

# Configurar inicio automático después de reinicios del sistema
pm2 startup
pm2 save
```

## 5. Monitorización y Logging

### Monitorización Básica con PM2
```bash
pm2 monit
```

### Implementación de Logging Avanzado
Considera añadir un servicio de logging como Winston o Pino:

```javascript
// Ejemplo con Winston
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'chatbot-backend' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// En producción también registra en la consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

// Usar en lugar de console.log/error
// logger.info('Servidor iniciado en puerto 3500');
```

## 6. Respaldo y Recuperación

Si manejas datos persistentes, implementa una estrategia de respaldo regular. Para este proyecto, lo más crítico es el respaldo de las configuraciones y variables de entorno.

## 7. Mantenimiento

### Actualizaciones de Dependencias
Mantén las dependencias actualizadas para evitar vulnerabilidades de seguridad:

```bash
# Verificar actualizaciones disponibles
npm outdated

# Actualizar dependencias
npm update
```

### Monitoreo de Uso de API de OpenAI
Implementa un sistema para monitorear el uso y costos asociados con la API de OpenAI.

## 8. Escalabilidad

Si tu aplicación crece, considera:

1. Implementar balanceo de carga.
2. Utilizar un sistema de caché para respuestas comunes.
3. Dividir la aplicación en microservicios si la complejidad aumenta.

## 9. CI/CD (Integración y Despliegue Continuos)

Implementa flujos de trabajo automatizados con GitHub Actions, GitLab CI, o Jenkins para pruebas y despliegue automático.

## 10. Costos y Optimización

- Mantén un registro de tus costos de API de OpenAI.
- Implementa estrategias para minimizar tokens utilizados.
- Considera la introducción de una capa de caché para respuestas comunes.

---

Esta guía ofrece recomendaciones generales. Adapta las sugerencias según las necesidades específicas de tu proyecto y entorno de despliegue.
