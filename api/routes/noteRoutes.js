const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController'); // Importa todo el controlador
const { protect } = require('../middleware/authMiddleware');

// Crear una nueva nota
router.post('/', protect, noteController.createNote);

// Obtener todas las notas de un usuario
router.get('/', protect, noteController.getNotes);

// Obtener una nota por ID
router.get('/:id', protect, noteController.getNoteById);

// Actualizar una nota por ID
router.put('/:id', protect, noteController.updateNote);

// Eliminar una nota por ID
router.delete('/:id', protect, noteController.deleteNote);

module.exports = router;

module.exports = router;