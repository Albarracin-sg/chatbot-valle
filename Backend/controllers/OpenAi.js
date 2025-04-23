import OpenAI from "openai";

// Controlador para manejar solicitudes POST al endpoint /api/openai
export const OpenAIController = async (req, res) => {
  try {
    // corrección del nombre del campo recibido en el cuerpo de la solicitud
    const { message } = req.body;

    // Validación: asegurarse de que se recibió el mensaje
    if (!message) {
      return res.status(400).json({ error: "El campo 'message' es obligatorio." });
    }

    // Obtener la clave API desde las variables de entorno
    const apiKey = process.env.OPENAI_API_KEY;

    // Validar que la API Key exista
    if (!apiKey) {
      return res.status(500).json({ error: "No se encontró la API Key de OpenAI." });
    }

    // Crear instancia del cliente OpenAI
    const openai = new OpenAI({ apiKey });

    // Solicitar respuesta a OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: message }
      ]
    });

    // Extraer la respuesta del asistente
    const respuesta = response.choices[0]?.message?.content;

    // Enviar respuesta al cliente
    return res.status(200).json({ message: respuesta });

  } catch (error) {
    console.error("Error al generar la respuesta:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};
