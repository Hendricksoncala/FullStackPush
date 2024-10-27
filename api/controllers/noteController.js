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
    // Verificar si la nota pertenece al usuario autenticado
    if (nota.usuario.toString() !== req.user.id) {
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
    const nota = await Note.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    // Verificar si la nota pertenece al usuario autenticado
    if (nota.usuario.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No tienes permiso para actualizar esta nota' });
    }
    nota.contenido = req.body.contenido || nota.contenido; // Actualizar solo si se proporciona nuevo contenido
    const notaActualizada = await nota.save();
    res.json(notaActualizada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una nota por ID
exports.deleteNote = async (req, res) => {
  try {
    const nota = await Note.findById(req.params.id);
    if (!nota) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }
    // Verificar si la nota pertenece al usuario autenticado
    if (nota.usuario.toString() !== req.user.id) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta nota' });
    }
    await nota.remove();
    res.json({ message: 'Nota eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};