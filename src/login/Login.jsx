import React, { useState } from 'react';
import './Login.css'; // Asegúrate de que esta línea esté en tu Login.js
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      console.log(JSON.stringify({ username, password }))
      // const token = localStorage.getItem('token'); // Recupera el token del localStorage

      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` // Incluye el token en la cabecera
        },
        body: JSON.stringify({ username, password }),

      });

      const data = await response.json();
      console.log(data);


      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/notes'); // Redirige a la página de notas
      } else {
        setError(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className="back-button">Volver</button>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
