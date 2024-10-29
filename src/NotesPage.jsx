// NotesPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotesPage.css';

function NotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

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

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    setSearchQuery('');
    setFilteredNotes(notes);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = notes.filter((note) =>
      note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
    );
    setFilteredNotes(filtered);
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Nota eliminada exitosamente');
        setNotes(notes.filter((note) => note._id !== id));
      } else {
        alert('Error al eliminar la nota');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="notes-page">
      <div className="header">
        <h1 className="title">Notes</h1>
        <button onClick={handleSearchToggle} className="search-button">🔍</button>
      </div>
      {showSearch && (
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Buscar notas..."
          className="search-input"
        />
      )}
      {notes.length === 0 && !searchQuery && (
        <div className="empty-state">
          <img src="/path/to/rafiki.png" alt="Create your first note" />
          <p>Create your first note!</p>
        </div>
      )}
        <ul>
          {(searchQuery ? filteredNotes : notes).map((note) => (
            <div key={note._id} className="note-card">
              <h3 onClick={() => handleNoteClick(note._id)} className="note-title">{note.title}</h3>
              <button onClick={() => handleDeleteNote(note._id)} className="delete-button">
                🗑️
              </button>
            </div>
          ))}
        </ul>
      <button className="create-note-button" onClick={handleCreateNote}>+</button>
    </div>
  );
}

export default NotesPage;
