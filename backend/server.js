require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Test-Endpunkt
app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok' });
});

// Benutzer registrieren
app.post('/register', async (req, res) => {
  const { username, password, role = 'ANALYST' } = req.body; // Default role to 'ANALYST'
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.userAuthentication.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
    res.json(user);
  } catch (err) {
    console.error('Fehler bei Registrierung:', err.message);
    console.error('Eingehende Daten:', req.body);
    res.status(500).json({ error: 'Registrierung fehlgeschlagen' });
  }
});

// Benutzer anmelden
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.userAuthentication.findUnique({
      where: { username },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error('Fehler beim Login:', err.message);
    res.status(500).json({ error: 'Login fehlgeschlagen' });
  }
});

// Logs speichern (vom Log-Generator oder Dashboard)
app.post('/api/logs', async (req, res) => {
  const { message, port, sourceIP, destinationIP, protocol, action, reason, timestamp } = req.body;
  try {
    const log = await prisma.logData.create({
      data: {
        message,
        port,
        sourceIP,
        destinationIP,
        protocol,
        action,
        reason,
        timestamp: timestamp ? new Date(timestamp) : new Date(),
      },
    });
    res.status(201).json(log);
  } catch (err) {
    console.error('Fehler beim Log-Speichern:', err.message);
    console.error('Eingehende Daten:', req.body);
    res.status(500).json({ error: 'Log-Speicherung fehlgeschlagen' });
  }
});

// Logs abrufen (für das Dashboard)
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await prisma.logData.findMany({
      orderBy: { timestamp: 'desc' },
    });
    res.json(logs);
  } catch (err) {
    console.error('Fehler beim Abrufen der Logs:', err.message);
    res.status(500).json({ error: 'Fehler beim Abrufen der Logs' });
  }
});

// Benutzer abrufen (für Admin-Dashboard)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.userAuthentication.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
      },
    });
    res.json(users);
  } catch (err) {
    console.error('Fehler beim Abrufen der Benutzer:', err.message);
    res.status(500).json({ error: 'Fehler beim Abrufen der Benutzer' });
  }
});

// Benutzer löschen
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.userAuthentication.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (err) {
    console.error('Fehler beim Löschen:', err.message);
    res.status(500).json({ error: 'Benutzer konnte nicht gelöscht werden' });
  }
});

// Server starten
const PORT = process.env.PORT || 9555;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
