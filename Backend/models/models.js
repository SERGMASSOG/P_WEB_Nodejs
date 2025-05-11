const mongoose = require('mongoose');

// Definir el esquema
const usuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true, unique: true },
    clave: { type: String, required: true }
});  
  // Crear el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema,);

module.exports = Usuario;