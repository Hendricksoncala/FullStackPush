import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Obtener la nota por ID al cargar el componente
    fetch(`http://localhost:5000/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(data => setNote(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    // Actualizar la nota en la base de datos
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title: note.title, content: note.content })
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  return (
    note && (
      <div className="note-detail">
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
          disabled={!isEditing}
          className="note-title"
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
          disabled={!isEditing}
          className="note-content"
        />
        {isEditing ? (
          <button onClick={handleSaveClick}>Guardar</button>
        ) : (
          <button onClick={handleEditClick}>Editar</button>
        )}
        <button onClick={() => navigate('/notes')}>Volver</button>
      </div>
    )
  );
}

export default NoteDetail;
