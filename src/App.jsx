import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './login/Login';
import Register from './register/Register';
import NotesPage from './NotesPage';
import CreateNote from './CreateNote'; // Importar el componente CreateNote
import EditNote from './EditNote'; 

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

          <Route path="/notes/:id" element={<EditNote />} /> 

          <Route path="/create-note" element={<CreateNote />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
