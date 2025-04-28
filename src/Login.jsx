import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN'); // Standardmäßig "ADMIN"

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Bitte Benutzername und Passwort eingeben');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }), // Rolle mitschicken
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin();
      } else {
        alert('Fehler beim Login: ' + data.message);
      }
    } catch (error) {
      console.error('Fehler beim Login:', error);
      alert('Serverfehler beim Login');
    }
  };

  return (
    <div className="loginContainer">
      <Form onSubmit={handleSubmit} className="loginForm">
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Benutzername:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Benutzername eingeben"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Passwort:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Passwort eingeben"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rolle auswählen:</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Admin"
              value="ADMIN"
              checked={role === 'ADMIN'}
              onChange={() => setRole('ADMIN')}
            />
            <Form.Check
              type="radio"
              label="Analyst"
              value="ANALYST"
              checked={role === 'ANALYST'}
              onChange={() => setRole('ANALYST')}
            />
          </div>
        </Form.Group>

        <Button className='loginButton' variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
