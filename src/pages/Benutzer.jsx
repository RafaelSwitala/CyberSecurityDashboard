import React, { useState, useEffect } from "react";
import './allPages.css';

const Benutzer = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [message, setMessage] = useState('');

  // Benutzer laden
  useEffect(() => {
    fetch('http://localhost:9555/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Fehler beim Laden der Benutzer:', err));
  }, []);

  // Benutzer erstellen
  const handleCreateUser = async () => {
    const response = await fetch('http://localhost:9555/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('✅ Benutzer erstellt!');
      setUsers((prev) => [...prev, data.user]);
      setUsername('');
      setPassword('');
    } else {
      setMessage(data.message || '❌ Fehler bei der Erstellung');
    }
  };

  return (
    <div className="mainPageContainer" style={{ display: 'flex', gap: '40px' }}>
      {/* Linke Seite: Benutzerliste */}
      <div style={{ flex: 1 }}>
        <h3>Benutzerliste</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.username} – {user.role}</li>
          ))}
        </ul>
      </div>

      {/* Rechte Seite: Benutzerformular */}
      <div style={{ flex: 1 }}>
        <h3>Neuen Benutzer erstellen</h3>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>
          <input
            type="radio"
            value="ADMIN"
            checked={role === 'ADMIN'}
            onChange={() => setRole('ADMIN')}
          /> ADMIN
        </label>
        <label>
          <input
            type="radio"
            value="ANALYST"
            checked={role === 'ANALYST'}
            onChange={() => setRole('ANALYST')}
          /> ANALYST
        </label>
        <br />
        <button onClick={handleCreateUser}>Erstellen</button>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Benutzer;
