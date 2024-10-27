import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

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
          </ul>
        </nav>

        <Routes> {/* Define las rutas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;