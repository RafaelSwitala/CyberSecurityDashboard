import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert('Bitte Benutzername und Passwort eingeben');
      return;
    }

    if (!['ADMIN', 'ANALYST'].includes(role)) {
      alert('Ungültige Rolle');
      return;
    }

    try {
      const response = await fetch('http://localhost:9555/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        const decodedToken = jwtDecode(data.token);
        console.log('Decoded Token:', decodedToken);
        onLogin(decodedToken.username); 
      } else {
        setErrorMessage(data.message || 'Login fehlgeschlagen');
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

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Button className='loginButton' variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
