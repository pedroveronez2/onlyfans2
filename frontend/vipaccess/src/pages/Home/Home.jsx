import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';

function Home() {
  const [notes, setNotes] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    getNotes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notes/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authTokens.access}`
        }
      });

      if (response.status === 200) {
        setNotes(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) { // Unauthorized
        logoutUser();
      }
      // Handle other errors here if needed
    }
  };

  return (
    <>
      <p>List:</p>
      <ul>
        {notes.map(note => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ul>
    </>
  );
}

export default Home;
