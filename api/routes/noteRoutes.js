const express = require('express');
const { createNote, getNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Crear nota (ruta protegida)
router.post('/', protect, createNote);

// Obtener todas las notas del usuario autenticado (ruta protegida)
router.get('/', protect, getNotes);

module.exports = router;
