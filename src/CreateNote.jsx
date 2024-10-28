import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNote.css';
import flecha from "./assets/flecha.png";
import ojo from "./assets/visibility.png";
import save from "./assets/save.png";

function CreateNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        alert('Nota creada exitosamente');
        navigate('/notes');
      } else {
        alert('Error al crear la nota');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="create-note-page">
      <div className="nav-buttons">
        <button onClick={() => navigate('/notes')} className="nav-button">
          <img src={flecha} alt="Volver" />
        </button>
        <div className="right-buttons">
          <button>
            <img src={ojo} alt="Previsualizar" />
          </button>
          <button onClick={handleSave} className="nav-button">
            <img src={save} alt="Guardar" />
          </button>
        </div>
      </div>
      <textarea
        className="title-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
      />
      <textarea
        className="content-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido"
      />
    </div>
  );
}

export default CreateNote;
