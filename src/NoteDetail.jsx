// NoteDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } else {
        console.error('Error al cargar la nota');
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content })
    });
    navigate('/');
  };

  if (!note) return <div>Loading...</div>;

  return (
    <div className="note-detail">
      <button onClick={() => navigate('/')}>⬅️ Back</button>
      <h2>{title}</h2>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
}

export default NoteDetail;
