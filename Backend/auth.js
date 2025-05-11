const express = require('express');
const Usuario = require('../models/models'); // Importar el modelo

const router = express.Router();

// Ruta para registrar un nuevo usuario SIN cifrado de contraseña
router.post('/registro', async (req, res) => {
  const { usuario, clave } = req.body;

  // 🔹 Validar que los campos no estén vacíos
  if (!usuario || !clave) {
    return res.status(400).json({ mensaje: "Todos los campos son requeridos." });
  }

  try {
    // 🔹 Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ usuario });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El usuario ya existe." });
    }

    // 🔹 Crear un nuevo usuario con la contraseña en texto plano
    const nuevoUsuario = new Usuario({ usuario, clave });

    // 🔹 Guardar el usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ mensaje: "Usuario registrado exitosamente." });
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).json({ mensaje: "Error interno en el servidor." });
  }
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ mensaje: "Error: JWT_SECRET no está definido en .env" });
}

});

module.exports = router;
