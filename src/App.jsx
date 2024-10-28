import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import NotesPage from './NotesPage';
import CreateNote from './CreateNote'; // Importar el componente CreateNote
import NoteDetail from './NoteDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
            <li>
              <Link to="/notes">Mis Notas</Link>
            </li>
            <li>
              <Link to="/create-note">Crear Nota</Link> {/* Link para crear una nota */}
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<NotesPage />} />

          <Route path="/notes/:id" element={<NoteDetail />} />

          <Route path="/create-note" element={<CreateNote />} /> {/* Nueva ruta */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
