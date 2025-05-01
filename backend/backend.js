const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 9555;

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === 'UserAuthentication' && ['create', 'update'].includes(params.action)) {
    const { password } = params.args.data;
    if (password) {
      params.args.data.password = await bcrypt.hash(password, 10);
    }
  }
  return next(params);
});


// Middleware
app.use(cors({ origin: 'http://localhost:9000' }));
app.use(express.json());
console.log('Server-Setup beginnt...');

// Benutzerlogin
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich.' });
  }

  try {
    const user = await prisma.userAuthentication.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    console.log('Login erfolgreich für:', username);
    res.json({ token });
  } catch (error) {
    console.error('Fehler beim Login:', error);
    res.status(500).json({ message: 'Interner Fehler' });
  }
});

// Benutzer erstellen
app.post('/api/create-user', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !['ADMIN', 'ANALYST'].includes(role)) {
    return res.status(400).json({ message: 'Ungültige Eingabedaten.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.userAuthentication.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({ message: 'Benutzer erfolgreich erstellt', user });
  } catch (error) {
    console.error('Fehler beim Erstellen des Benutzers:', error);
    res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers' });
  }
});

// Benutzer löschen
app.delete('/api/delete-user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.userAuthentication.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Benutzer gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen des Benutzers:', error);
    res.status(500).json({ message: 'Fehler beim Löschen des Benutzers' });
  }
});


// Logdaten speichern
app.post('/api/log', async (req, res) => {
  const { message, port, sourceIP } = req.body;

  if (!message || !port || !sourceIP) {
    return res.status(400).json({ message: 'Alle Logfelder sind erforderlich.' });
  }

  try {
    const log = await prisma.logData.create({ data: { message, port, sourceIP } });
    console.log('📝 Log gespeichert:', log.id);
    res.json(log);
  } catch (error) {
    console.error('Fehler beim Speichern des Logs:', error);
    res.status(500).json({ message: 'Fehler beim Speichern des Logs' });
  }
});

// Alle Benutzer anzeigen (zum Testen)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.userAuthentication.findMany();
    res.json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Benutzer' });
  }
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

// Angriffe simulieren: Alert-Icon
app.get('/api/logs', async (req, res) => {
  try {
    const logs = await prisma.logData.findMany({ orderBy: { timestamp: 'desc' }, take: 20 });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Logs' });
  }
});


// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});