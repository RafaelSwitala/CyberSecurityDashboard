import React, { useState, useEffect } from "react";
import './allPages.css'; // Globales CSS für Seitenlayout

const Benutzer = () => {
  // State-Variablen zur Verwaltung von Benutzerdaten und Formularfeldern
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [message, setMessage] = useState('');

  // Lädt Benutzer beim ersten Rendern
  useEffect(() => {
    fetchUsers();
  }, []);

  // Funktion zum Laden der Benutzer vom Server
  const fetchUsers = () => {
    fetch('http://localhost:9555/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Fehler beim Laden der Benutzer:', err));
  };

  // Funktion zum Erstellen eines neuen Benutzers
  const handleCreateUser = async () => {
    const response = await fetch('http://localhost:9555/api/create-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Benutzer erstellt!');
      setUsername('');
      setPassword('');
      fetchUsers();
    } else {
      setMessage(data.message || 'Fehler bei der Erstellung');
    }
  };

  // Funktion zum Löschen eines Benutzers
  const handleDeleteUser = async (id) => {
    const response = await fetch(`http://localhost:9555/api/delete-user/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Benutzer aus der UI entfernen
      setUsers(users.filter(user => user.id !== id));
      setMessage('Benutzer gelöscht.');
    } else {
      const data = await response.json();
      setMessage(data.message || 'Fehler beim Löschen');
    }
  };

  return (
    <div className="mainPageContainer">
      <div className="mainPageContainerBenutzerVerwaltung">

        {/* Benutzerliste anzeigen */}
        <div className="userList">
          <h3>Benutzerliste</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Benutzername</th>
                <th>Rolle</th>
                <th>Aktion</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleDeleteUser(user.id)}>Löschen</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Formular zur Erstellung neuer Benutzer */}
        <div className="createNewUser">
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
          {/* Auswahl der Benutzerrolle */}
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
    </div>
  );
};

export default Benutzer;
