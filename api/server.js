require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const { protect } = require('./middleware/authMiddleware'); // Importa el middleware

const app = express();
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'NotesApp', 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Rutas
app.use('/users', userRoutes); 

// Rutas protegidas con el middleware
app.use('/notes', protect, noteRoutes); 

// Inicializar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`), (err) => {
  if (err) {
    console.error('Error starting server:', err);
  }
});