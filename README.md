# Chatbot Valle - Backend

Este es el backend para el Chatbot Valle, un servicio que utiliza la API de OpenAI para proporcionar respuestas inteligentes a consultas de usuarios.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript del lado del servidor
- **Express**: Framework web para Node.js
- **OpenAI API**: API para acceder a modelos de lenguaje avanzados (GPT-4o-mini)
- **Dotenv**: Para gestión de variables de entorno
- **CORS**: Para permitir solicitudes de origen cruzado
- **Nodemon**: Para desarrollo con reinicio automático del servidor

## Requisitos previos

- Node.js (versión recomendada: 16.x o superior)
- npm (viene incluido con Node.js)
- Una clave API válida de OpenAI

## Instalación

1. **Clonar el repositorio o descargar los archivos**

2. **Instalar dependencias:**

```bash
npm install
```

O instalar dependencias individualmente:

```bash
npm i express cors dotenv nodemon openai
```

3. **Configurar variables de entorno:**

Crea o edita el archivo `.env` en la raíz del proyecto con la siguiente información:

```
OPENAI_API_KEY="tu-clave-api-de-openai"
PORT=3500
```

## Estructura del proyecto

```
backend/
  ├── controllers/            # Controladores para manejar la lógica de negocio
  │   └── OpenAi.js           # Controlador para comunicación con la API de OpenAI
  ├── Router/                 # Definiciones de rutas
  │   └── openAIRouter.js     # Router para endpoints de OpenAI
  ├── node_modules/           # Dependencias instaladas (generado por npm)
  ├── .env                    # Variables de entorno (no incluir en repositorios)
  ├── app.js                  # Configuración de Express y middleware
  ├── package-lock.json       # Definición exacta de dependencias
  ├── package.json            # Definición de dependencias y scripts
  ├── README.md               # Documentación del proyecto
  ├── requerimientosBack.txt  # Lista de dependencias necesarias
  ├── Routes.js               # Exportación de rutas para uso en app.js
  └── server.js               # Punto de entrada de la aplicación
```

## Ejecutar el servidor

### En modo desarrollo (con reinicio automático):

```bash
npm run dev
```

### En modo producción:

```bash
npm start
```

Por defecto, el servidor se ejecutará en el puerto 3500 (configurable en el archivo `.env`).

## Endpoints API

### Test de conectividad

- **URL:** `/test`
- **Método:** `GET`
- **Descripción:** Verifica que el servidor esté funcionando correctamente
- **Respuesta exitosa:**
  ```json
  {
    "message": "El servidor está funcionando correctamente"
  }
  ```

### Chat con OpenAI

- **URL:** `/api/openai`
- **Método:** `POST`
- **Descripción:** Envía un mensaje al modelo GPT-4o-mini de OpenAI y recibe una respuesta
- **Headers:**
  - `Content-Type: application/json`
- **Cuerpo de la solicitud:**
  ```json
  {
    "message": "Tu mensaje aquí"
  }
  ```
- **Respuesta exitosa (200 OK):**
  ```json
  {
    "message": "Respuesta del modelo de OpenAI"
  }
  ```
- **Respuestas de error:**
  - `400 Bad Request`: El campo 'message' es obligatorio
    ```json
    {
      "error": "El campo 'message' es obligatorio."
    }
    ```
  - `500 Internal Server Error`: Error con la API Key o al procesar la solicitud
    ```json
    {
      "error": "Error interno del servidor"
    }
    ```

## Características

- Registro de solicitudes por consola para depuración
- Manejo de errores centralizado
- Soporte para CORS configurado para desarrollo
- Implementación modular para facilitar la extensión

## Solución de problemas

### Problemas comunes:

1. **Puerto ya en uso** - Cambia el puerto en el archivo `.env` si el puerto 3500 ya está siendo utilizado.
2. **API Key inválida** - Verifica que tu clave API de OpenAI sea válida y esté correctamente configurada en el archivo `.env`.
3. **Error de CORS** - Si tienes problemas de acceso desde el frontend, la configuración actual permite cualquier origen (`*`). En producción, considera restringir esto a dominios específicos.
4. **Timeout en respuestas** - Las solicitudes a OpenAI pueden tomar tiempo. Si experimentas timeouts, considera aumentar el límite de tiempo en tu servidor o en el cliente.

## Seguridad

- La clave API de OpenAI se almacena como variable de entorno y no se incluye en el código
- Validación básica de entradas en el controlador
- En producción, se recomienda configurar CORS para permitir solo orígenes específicos

## Extensión

Para añadir nuevas funcionalidades:
1. Crea nuevos controladores en la carpeta `controllers/`
2. Define nuevas rutas en la carpeta `Router/`
3. Exporta e importa las rutas en `Routes.js` y `app.js`

## Licencia

Univercidad Universitaria de Colombia

## Versión

1.0.0
