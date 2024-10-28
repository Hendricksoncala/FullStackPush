import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateNote.css';

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
        <button onClick={() => navigate('/notes')}>←</button>
        <button>👁️</button>
        <button>📷</button>
      </div>
      <input
        className="title-input"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        className="content-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={handleSave} className="save-button">✔️</button>
    </div>
  );
}

export default CreateNote;
