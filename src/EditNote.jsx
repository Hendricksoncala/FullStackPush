import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditNote() {
  const { id } = useParams(); // Obtener el ID de la nota desde la URL
  const navigate = useNavigate();
  const [note, setNote] = useState({ title: '', content: '' });

  // Cargar la nota cuando el componente se monte
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`http://localhost:5000/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNote({ title: data.title, content: data.content });
        } else {
          console.error('Error al cargar la nota');
        }
      } catch (error) {
        console.error('Error al cargar la nota:', error);
      }
    };
    fetchNote();
  }, [id]);

  // Manejar los cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  // Actualizar la nota
  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(note),
      });
      if (response.ok) {
        console.log('Nota actualizada con éxito');
        navigate('/notes'); // Navegar de regreso a la página de notas
      } else {
        console.error('Error al actualizar la nota');
      }
    } catch (error) {
      console.error('Error al actualizar la nota:', error);
    }
  };

  // Eliminar la nota
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // si usas autenticación basada en token
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Notificación de éxito
        // Aquí podrías actualizar el estado o recargar las notas
      } else {
        alert(data.message); // Mensaje de error
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="create-note-page">
      <div className="nav-buttons">
        <button onClick={() => navigate('/notes')}>Volver</button>
      </div>
      <input
        className="title-input"
        type="text"
        name="title"
        value={note.title}
        onChange={handleInputChange}
        placeholder="Título"
      />
      <textarea
        className="content-textarea"
        name="content"
        value={note.content}
        onChange={handleInputChange}
        placeholder="Contenido"
      ></textarea>
      <button className="save-button" onClick={handleUpdate}>Guardar Cambios</button>
      <button onClick={handleDelete} style={{ backgroundColor: 'red' }}>Eliminar Nota</button>
    </div>
  );
}

export default EditNote;
