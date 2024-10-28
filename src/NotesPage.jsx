import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotesPage.css'; // Importa el archivo CSS

function NotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Si no hay token, redirige al login
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:5000/notes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Error al obtener las notas');
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    };

    fetchNotes();
  }, [navigate]); // El efecto se ejecuta solo cuando `navigate` cambia

  const handleCreateNote = () => {
    // Lógica para navegar a la página de creación de notas
    navigate('/create-note'); // Ajusta la ruta según tu configuración
  };

  return (
    <div className="notes-page">
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
        ))}
      </ul>
      <button className="create-note-button" onClick={handleCreateNote}>
        +
      </button>
    </div>
  );
}

export default NotesPage;