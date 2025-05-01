import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Bitte Benutzername und Passwort eingeben');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Login fehlgeschlagen');
      }

      const data = await res.json();
      const token = data.token;

      // 🛡 Token & Rolle speichern
      localStorage.setItem('token', token);
      const payload = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('userRole', payload.role);
      localStorage.setItem('isAuthenticated', 'true');

      onLogin();
    } catch (err) {
      console.error('❌ Login-Fehler:', err.message);
      alert('Login fehlgeschlagen');
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

        <Button className="loginButton" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;

