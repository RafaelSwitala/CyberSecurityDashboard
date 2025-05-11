const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9555;
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: 'http://localhost:9000' }));
app.use(express.json());
console.log('Server-Setup beginnt...');

// Passwort-Hashing Middleware für Prisma
prisma.$use(async (params, next) => {
  if (params.model === 'UserAuthentication' && ['create', 'update'].includes(params.action)) {
    const { password } = params.args.data;
    if (password) {
      params.args.data.password = await bcrypt.hash(password, 10);
    }
  }
  return next(params);
});

// Benutzer registrieren (Create)
app.post('/api/create-user', async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !['ADMIN', 'ANALYST'].includes(role)) {
    return res.status(400).json({ message: 'Ungültige Eingabedaten.' });
  }

  try {
    const user = await prisma.userAuthentication.create({
      data: { username, password, role }
    });

    // JSON-Datei im Verzeichnis public/userData schreiben
    const userDir = path.join(__dirname, '../public/userData');
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    const userJson = {
      Username: username,
      Userrolle: role
    };

    const filePath = path.join(userDir, `${username}.json`);
    await fs.promises.writeFile(filePath, JSON.stringify(userJson, null, 2));

    res.status(201).json({ message: 'Benutzer erfolgreich erstellt', user });
  } catch (error) {
    console.error('Fehler beim Erstellen des Benutzers:', error);
    res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers' });
  }
});

// Benutzerprofil abrufen
app.get('/api/user-profile/:username', async (req, res) => {
  const username = req.params.username;
  const filePath = path.join(__dirname, '../public/userData', `${username}.json`);

  try {
    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    res.json(JSON.parse(fileData));
  } catch (error) {
    console.error('Fehler beim Laden des Benutzerprofils:', error);
    res.status(404).json({ message: 'Benutzerprofil nicht gefunden' });
  }
});

// Benutzerprofil speichern
app.post('/api/user-profile/:username', async (req, res) => {
  const username = req.params.username;
  const filePath = path.join(__dirname, '../public/userData', `${username}.json`);

  try {
    const data = req.body;
    await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2));
    res.status(200).json({ message: 'Benutzerprofil gespeichert' });
  } catch (error) {
    console.error('Fehler beim Speichern des Benutzerprofils:', error);
    res.status(500).json({ message: 'Fehler beim Speichern' });
  }
});

// Benutzer anmelden (Login)
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
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    console.log('Login erfolgreich für:', username);
    res.json({ token });
  } catch (error) {
    console.error('Fehler beim Login:', error);
    res.status(500).json({ message: 'Interner Fehler' });
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

// Alle Benutzer anzeigen (Admin/Test)
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.userAuthentication.findMany();
    res.json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Benutzer' });
  }
});

// Logdaten speichern
app.post('/api/logs', async (req, res) => {
  const { message, port, sourceIP } = req.body;

  if (!message || !port || !sourceIP) {
    return res.status(400).json({ message: 'Alle Logfelder sind erforderlich.' });
  }

  try {
    const log = await prisma.logData.create({ data: { message, port, sourceIP } });
    console.log('Log gespeichert:', log.id);
    res.json(log);
  } catch (error) {
    console.error('Fehler beim Speichern des Logs:', error);
    res.status(500).json({ message: 'Fehler beim Speichern des Logs' });
  }
});

// Alarm bei Angriff:
app.get('/api/logs', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'public', 'tools', 'attackLogs.ndjson');

    if (!fs.existsSync(filePath)) {
      return res.json({ logs: [], alerts: [] });
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const logLines = fileContent.trim().split('\n');
    const logs = logLines.map(line => JSON.parse(line));

    console.log("Alle Logs:", logs); 

    const bruteForceLogs = logs.filter(log => log.reason?.includes("Brute Force"));
    console.log("Gefilterte Brute-Force-Logs:", bruteForceLogs); 

    const alertClusters = [];
    let cluster = [];

    const sortedLogs = bruteForceLogs.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    console.log("Sortierte Brute-Force-Logs:", sortedLogs);

    for (let i = 0; i < sortedLogs.length; i++) {
      cluster.push(sortedLogs[i]);

      const windowStart = new Date(cluster[0].timestamp).getTime();
      const windowEnd = new Date(sortedLogs[i].timestamp).getTime();
      console.log(`Window Start: ${windowStart}, Window End: ${windowEnd}`);

      if (windowEnd - windowStart > 10000 || i === sortedLogs.length - 1) {
        if (cluster.length >= 10) {
          alertClusters.push({
            reason: 'Brute Force Login',
            count: cluster.length,
            time: new Date(cluster[0].timestamp).toLocaleString(),
          });
        }
        cluster = [sortedLogs[i]];
      }
    }

    console.log("Gefundene Alerts:", alertClusters);
    res.json({
      logs,
      alerts: alertClusters,
    });
  } catch (err) {
    console.error('Fehler beim Verarbeiten der Logs:', err);
    res.status(500).json({ message: 'Fehler beim Abrufen der Logs' });
  }
});

// Erstellen von Attack-Simulator Logs
const logDir = path.join(__dirname, '../public/tools');
const filePath = path.join(logDir, 'attackLogs.ndjson');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logStream = fs.createWriteStream(filePath, { flags: 'a' });

app.post('/api/simulated-log', async (req, res) => {
  try {
    const log = req.body;

    if (!log.timestamp || !log.source_ip || !log.destination_ip || !log.port || !log.protocol || !log.action || !log.reason) {
      return res.status(400).json({ message: 'Fehlende erforderliche Felder in den Log-Daten.' });
    }

    const logLine = JSON.stringify(log) + '\n';
    await fs.promises.appendFile(filePath, logLine);

    console.log('Angriff empfangen:', log.reason);
    res.status(200).json({ message: 'Angriff erfolgreich gespeichert.' });
  } catch (err) {
    console.error('Fehler beim Schreiben der Log-Datei:', err);
    res.status(500).json({ message: 'Fehler beim Schreiben der Datei.' });
  }
});

// Prisma Disconnect beim Beenden
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
