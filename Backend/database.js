require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error en la conexión a MongoDB:', err));

//module.exports = mongoose;