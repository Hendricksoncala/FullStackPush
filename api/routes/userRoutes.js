const express = require('express');
const { registerUser, loginUser } = require('../controllers/UserController');
const router = express.Router();

// Ruta para registrar usuario
router.post('/', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

module.exports = router;
