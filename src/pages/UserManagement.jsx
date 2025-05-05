import React, { useState, useEffect } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ANALYST');
  const [page, setPage] = useState(1); // Aktuelle Seite
  const [itemsPerPage] = useState(10); // Anzahl der Elemente pro Seite

  useEffect(() => {
    fetchUsers();
  }, [page]); // Wenn sich die Seite ändert, lade Benutzer erneut

  // Benutzer von der API abrufen
  const fetchUsers = async () => {
    try {
      const res = await fetch(`http://localhost:9555/api/users?page=${page}&limit=${itemsPerPage}`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('❌ Fehler beim Abrufen der Benutzer:', err);
    }
  };

  // Benutzer registrieren
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert('Bitte Benutzername und Passwort eingeben.');
      return;
    }

    try {
      const res = await fetch('http://localhost:9555/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        alert('❌ Fehler beim Anlegen: ' + errorMsg);
        return;
      }

      setUsername('');
      setPassword('');
      fetchUsers();
    } catch (err) {
      console.error('❌ Fehler beim Anlegen:', err);
    }
  };

  // Benutzer löschen
  const handleDelete = async (id) => {
    const confirm = window.confirm('Möchtest du diesen Benutzer wirklich löschen?');
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:9555/api/users/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers(); 
      } else {
        alert('❌ Fehler beim Löschen');
      }
    } catch (err) {
      console.error('❌ Fehler beim Löschen:', err);
    }
  };

  // Seitenwechsel
  const changePage = (newPage) => {
    if (newPage > 0) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Benutzerverwaltung</h2>

      <Form onSubmit={handleRegister} className="mb-3">
        <Form.Group className="mb-2">
          <Form.Label>Benutzername</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Passwort</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Rolle</Form.Label>
          <Form.Select value={role} onChange={e => setRole(e.target.value)}>
            <option value="ADMIN">Admin</option>
            <option value="ANALYST">Analyst</option>
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">Benutzer anlegen</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Benutzername</th>
            <th>Rolle</th>
            <th>Erstellt am</th>
            <th>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  Löschen
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="pagination">
        <Button
          disabled={page <= 1}
          onClick={() => changePage(page - 1)}
        >
          « Vorherige
        </Button>
        <span>Seite {page}</span>
        <Button
          onClick={() => changePage(page + 1)}
        >
          Nächste »
        </Button>
      </div>
    </div>
  );
};

export default UserManagement;

