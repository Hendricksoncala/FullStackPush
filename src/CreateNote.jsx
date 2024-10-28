// CreateNote.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token'); // Asegúrate de tener el token de autenticación
      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Enviar token de autorización
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('Nota creada exitosamente');
        navigate('/notes'); // Redirigir a la página de notas
      } else {
        alert('Error al crear la nota');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Crear Nota</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contenido:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>
        <br />
        <button onClick={() => navigate('/notes')}>Salir</button>
        <button onClick={handleSave}>Guardar</button>
      </form>
    </div>
  );
}

export default CreateNote;
