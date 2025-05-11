/**
 * Vamos a crear rutas del servidor
 * Creamos un módulo con Express
 * Usaremos como nuestra REST API para enviar y recibir datos en formato JSON
 */

const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

// Ruta de prueba
router.get('/', (req, res) => {
    res.json({
        status: 'API REST funcionando'
    });
});

// Rutas para empleados
router.get('/', empleadoCtrl.getEmpleados); // Obtener empleados
router.post('/', empleadoCtrl.createEmpleados); // Guardar empleado
router.get('/:id', empleadoCtrl.getUnicoEmpleado); // Obtener un empleado específico
router.put('/:id', empleadoCtrl.editarEmpleado); // Actualizar un empleado
router.delete('/:id', empleadoCtrl.eliminarEmpleado); // Eliminar un empleado

module.exports = router;