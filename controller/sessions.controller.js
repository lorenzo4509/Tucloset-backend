const Session = require("../models/Sessions.model");

// Función para crear una sesión
const createSession = async (req, res) => {
  try {
    // Obtener los datos de la sesión desde el cuerpo de la solicitud
    const { userId, token } = req.body;

    // Crear una nueva sesión en la base de datos
    const session = await Session.create({
      userId,
      token,
    });

    // Enviar una respuesta con la sesión creada
    res.status(201).json({ session });
  } catch (error) {
    // En caso de error, enviar una respuesta con el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

// Función para cerrar una sesión
const logout = async (req, res) => {
  try {
    // Obtener el token de autenticación de la sesión actual
    const token = req.headers.authorization;

    // Buscar y eliminar la sesión con el token proporcionado
    await Session.findOneAndDelete({ token });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // En caso de error, enviar una respuesta con el mensaje de error
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSession,
  logout,
};
