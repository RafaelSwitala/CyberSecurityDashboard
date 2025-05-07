import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Bitte Benutzername und Passwort eingeben');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);

        console.log('✅ Eingeloggt als:', decoded.username, 'Rolle:', decoded.role);
        onLogin(token);
      } else {
        setErrorMessage(data.message || 'Login fehlgeschlagen');
      }
    } catch (error) {
      console.error('❌ Login-Fehler:', error);
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
            onChange={(e) => setUsername(e.target.value.trim())}
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Button className="loginButton" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
