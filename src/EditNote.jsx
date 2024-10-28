import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener la nota por ID
    fetch(`http://localhost:5000/notes/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => response.json())
      .then(data => {
        setNote({ title: data.title, content: data.content });
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleInputChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(note)
    })
      .then(response => response.json())
      .then(() => navigate('/notes')) // Redirige a la lista de notas después de editar
      .catch(err => console.error(err));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(() => navigate('/notes')) // Redirige a la lista después de eliminar
      .catch(err => console.error(err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="note-editor">
      <input
        type="text"
        name="title"
        value={note.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <textarea
        name="content"
        value={note.content}
        onChange={handleInputChange}
        placeholder="Contenido"
      ></textarea>
      <button onClick={handleUpdate}>Guardar Cambios</button>
      <button onClick={handleDelete} style={{ backgroundColor: 'red' }}>
        Eliminar Nota
      </button>
    </div>
  );
}

export default EditNote;
