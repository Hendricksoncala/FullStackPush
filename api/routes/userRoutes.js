const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/', registerUser);          // Crear Usuario
router.post('/login', loginUser);         // Iniciar Sesión

module.exports = router;
