import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Si usas React Router
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Si usas React Router

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // Limpia el error anterior

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Redirige al usuario a la página de inicio de sesión
        navigate('/login'); 
      } else {
        const errorData = await response.json(); // Obtiene el mensaje de error del servidor
        setError(errorData.message || 'Error al registrar el usuario'); // Muestra el error al usuario
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Error en la solicitud'); // Muestra un error genérico al usuario
    }
  };

  return (
    <div className="container"> {/* Agrega un contenedor */}
    <button onClick={() => navigate('/')} className="back-button">Volver</button>
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>   

        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Registrarse</button>   

      </form>
      {error && <div className="error-message">{error}</div>} 
    </div>
  );
}

export default Register;