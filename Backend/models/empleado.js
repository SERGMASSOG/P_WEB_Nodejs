const mongoose = require('mongoose');
const { Schema } = mongoose;

const EmpleadoSchema = new Schema({
    Name: { type: String, required: true },
    Position: { type: String, required: true },
    Office: { type: String, required: true },
    Salary: { type: Number, required: true },
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);

