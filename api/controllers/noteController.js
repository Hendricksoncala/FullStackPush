const Note = require('../models/Note');

// Crear una nueva nota
exports.createNote = async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      user: req.user._id,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las notas del usuario autenticado
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una nota por ID
exports.getNoteById = async (req, res) => {
  try {
    const nota = await Note.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    
    // Verificar si la nota tiene el campo user y si pertenece al usuario autenticado
    if (!nota.user || nota.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta nota' });
    }
    
    res.json(nota);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una nota por ID
exports.updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    if (!noteId) {
      return res.status(400).json({ message: "ID de nota no proporcionado" });
    }

    const updatedData = req.body;
    if (!updatedData.title || !updatedData.content) {
      return res.status(400).json({ message: "Título y contenido son obligatorios" });
    }

    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ message: "Nota no encontrada" });
    }

    note.title = updatedData.title;
    note.content = updatedData.content;

    await note.save();
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una nota por ID
// noteController.js
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Verificar si la nota existe
    if (!note) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    // Verificar si la nota tiene un usuario y si pertenece al usuario autenticado
    if (!note.user || note.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta nota' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Nota eliminada exitosamente' });
  } catch (error) {
    console.error('Error en el controlador deleteNote:', error);
    res.status(500).json({ message: 'Error al eliminar la nota' });
  }
};
