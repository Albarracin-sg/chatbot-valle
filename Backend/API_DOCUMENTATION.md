# Documentación de la API - Chatbot Valle

Este documento describe los endpoints disponibles en la API del Chatbot Valle, sus parámetros y respuestas esperadas.

## Base URL

```
http://localhost:3500
```

El puerto predeterminado es 3500, pero puede ser configurado en el archivo `.env`.

## Autenticación

Esta API no requiere autenticación para las solicitudes, ya que la API key de OpenAI se maneja a nivel de servidor.

## Endpoints

### 1. Test de Conectividad

Verifica que el servidor esté funcionando correctamente.

- **URL**: `/test`
- **Método**: `GET`
- **URL Completa**: `http://localhost:3500/test`

#### Respuesta Exitosa

- **Código**: 200 OK
- **Contenido**:
  ```json
  {
    "message": "El servidor está funcionando correctamente"
  }
  ```

### 2. Chat con OpenAI

Envía un mensaje al modelo GPT-4o-mini de OpenAI y recibe una respuesta generada.

- **URL**: `/api/openai`
- **Método**: `POST`
- **URL Completa**: `http://localhost:3500/api/openai`
- **Headers**:
  - `Content-Type: application/json`

#### Parámetros de la Solicitud

- **Body**:
  ```json
  {
    "message": "string" // El mensaje que se enviará al modelo de OpenAI
  }
  ```

#### Respuesta Exitosa

- **Código**: 200 OK
- **Contenido**:
  ```json
  {
    "message": "string" // La respuesta generada por el modelo de OpenAI
  }
  ```

#### Respuestas de Error

- **Código**: 400 Bad Request
- **Contenido**:
  ```json
  {
    "error": "El campo 'message' es obligatorio."
  }
  ```

- **Código**: 500 Internal Server Error
- **Contenido**:
  ```json
  {
    "error": "Error interno del servidor"
  }
  ```
  o
  ```json
  {
    "error": "No se encontró la API Key de OpenAI."
  }
  ```

## Ejemplos de Uso

### Ejemplo 1: Test de Conectividad

**Solicitud**:
```bash
curl -X GET http://localhost:3500/test
```

**Respuesta**:
```json
{
  "message": "El servidor está funcionando correctamente"
}
```

### Ejemplo 2: Enviar un Mensaje al Chatbot

**Solicitud**:
```bash
curl -X POST http://localhost:3500/api/openai \
  -H "Content-Type: application/json" \
  -d '{"message": "¿Cuál es la capital de Colombia?"}'
```

**Respuesta**:
```json
{
  "message": "La capital de Colombia es Bogotá, oficialmente llamada Bogotá, Distrito Capital. Es la ciudad más grande y poblada del país, además de ser su principal centro económico, administrativo, industrial, artístico, cultural y turístico."
}
```

## Consideraciones

1. Las solicitudes a la API de OpenAI pueden tomar varios segundos en completarse, dependiendo del tamaño del mensaje y la carga del servidor de OpenAI.

2. El modelo utilizado actualmente es `gpt-4o-mini`. Si deseas cambiar el modelo, deberás modificar el archivo `controllers/OpenAi.js`.

3. Existe un límite en el tamaño del mensaje que puede ser enviado a la API de OpenAI. Si tienes problemas con mensajes muy largos, considera dividirlos en partes más pequeñas.

4. La configuración actual de CORS permite solicitudes desde cualquier origen. En un entorno de producción, se recomienda restringir esto a orígenes específicos.

## Errores Comunes

- **API Key inválida o expirada**: Verifica que la clave API de OpenAI en el archivo `.env` sea válida y esté actualizada.

- **Límite de cuota excedido**: Si recibes errores relacionados con límites de cuota, es posible que hayas alcanzado el límite de tu plan de OpenAI.

- **Formato de solicitud incorrecto**: Asegúrate de que estás enviando el campo `message` en el cuerpo de la solicitud en formato JSON.

## Versión de la API

Versión 1.0.0
