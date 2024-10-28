import React from 'react';
import { Link } from 'react-router-dom';
import './Start.css';

function Start() {
  return (
    <div className="start-page">
      <h1>Bienvenido</h1>
      <div className="start-buttons">
        <Link to="/login">
          <button className="start-button">Iniciar Sesión</button>
        </Link>
        <Link to="/register">
          <button className="start-button">Registrarse</button>
        </Link>
      </div>
    </div>
  );
}

export default Start;
