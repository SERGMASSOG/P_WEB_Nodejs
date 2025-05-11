require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); // Importar mongoose
const jwt = require('jsonwebtoken');

const Usuario = require('./models/models'); // Importar el modelo
const app = express();

// 🔹 Conectar a la base de datos MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch((err) => console.error("Error en la conexión a MongoDB:", err));

// 🔹 Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({origin: ['http://localhost:5173'], credentials: true }));

// 🔹 Importar rutas
const empleadoRoutes = require('./routes/empleado.route');
app.use('/api/empleados', empleadoRoutes);

// 🔹 Ruta de login SIN cifrado
app.post('/login', async (req, res) => {
    const { usuario, clave } = req.body;
    try {
        const usuarioEncontrado = await Usuario.findOne({ usuario });

        if (!usuarioEncontrado) {
            return res.status(401).send('Credenciales incorrectas.');
        }

        // Comparación DIRECTA de la contraseña (SIN bcrypt)
        if (clave !== usuarioEncontrado.clave) {
            return res.status(401).send('Credenciales incorrectas.');
        }

        // Generar el JWT
        const token = jwt.sign(
            { id: usuarioEncontrado._id, usuario: usuarioEncontrado.usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ mensaje: `¡Bienvenido, ${usuarioEncontrado.usuario}!`, token });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error en la base de datos');
    }
});

// 🔹 Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`🚀 Server activo en el puerto ${app.get('port')}`);
});
