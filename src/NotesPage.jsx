// NotesPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotesPage.css';

function NotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
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
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchNotes();
  }, [navigate]);

  const handleCreateNote = () => {
    navigate('/create-note');
  };

  const handleNoteClick = (id) => {
    navigate(`/notes/${id}`);
  };
//ESTAS SON LAS CARTAS PEQUENAS QUE SE VEN EN LA PAGINA PRINCIPAL
  return (
    <div className="notes-page">
      <h1>Notes</h1>
      <div className="notes-container">
        {notes.map((note) => (
          <div
            key={note._id}
            className="note-card"
            onClick={() => navigate(`/notes/${note._id}`)} // Navega a la ruta de detalle de la nota
          >
            <h3>{note.title}</h3>
            {/* <p>{note.content}</p> */}
          </div>
        ))}
      </div>
      <button className="create-note-button" onClick={handleCreateNote}>
        +
      </button>
    </div>
  );
}

export default NotesPage;
