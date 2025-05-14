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

// POST /api/alerts/review – speichert wer wann bestätigt hat
app.post('/api/alerts/review', async (req, res) => {
  const { userId, username } = req.body;
  if (!userId || !username) {
    return res.status(400).json({ message: 'Benutzerdaten fehlen' });
  }

  try {
    await prisma.alertReview.create({
      data: {
        userId,
        username,
        reviewedAt: new Date(),
      },
    });
    res.json({ message: 'Review gespeichert' });
  } catch (error) {
    console.error('Fehler beim Speichern der Review:', error);
    res.status(500).json({ message: 'Fehler beim Speichern der Bestätigung' });
  }
});

// GET /api/alerts/review-history – liefert Verlauf für Admins
app.get('/api/alerts/review-history', async (req, res) => {
  try {
    const history = await prisma.alertReview.findMany({
      orderBy: { reviewedAt: 'desc' }
    });
    res.json(history);
  } catch (error) {
    console.error('Fehler beim Abrufen der History:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der History' });
  }
});

// GET /api/alerts/unreviewed/:userId – prüft, ob es neue Alerts seit der letzten Bestätigung gibt
app.get('/api/alerts/unreviewed/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const lastReview = await prisma.alertReview.findFirst({
      where: { userId },
      orderBy: { reviewedAt: 'desc' },
    });

    const lastReviewTime = lastReview?.reviewedAt || new Date(0);

    const newFirewallLogs = await prisma.logData.findFirst({
      where: {
        action: 'blocked',
        timestamp: { gt: lastReviewTime }
      }
    });

    const newWindowsLogs = await prisma.windowsLog.findFirst({
      where: {
        OR: [{ level: 'Error' }, { eventID: 4625 }],
        timestamp: { gt: lastReviewTime }
      }
    });

    const hasNewAlerts = !!newFirewallLogs || !!newWindowsLogs;
    res.json({ hasNewAlerts });
  } catch (error) {
    console.error('Fehler bei Alert-Check:', error);
    res.status(500).json({ message: 'Fehler beim Prüfen neuer Alerts' });
  }
});

// Windows Logs speichern
app.post('/api/windows-logs', async (req, res) => {
  const { timestamp, host, user, eventID, level, message } = req.body;

  if (!timestamp || !host || !user || !eventID || !level || !message) {
    return res.status(400).json({ message: 'Alle Felder sind erforderlich.' });
  }

  try {
    const log = await prisma.windowsLog.create({
      data: {
        timestamp: new Date(timestamp),
        host,
        user,
        eventID,
        level,
        message
      }
    });

    // Mail bei kritischen Logs
    if (eventID === 4625 || level.toLowerCase() === 'error') {
      console.log('Kritisches Windows-Log erkannt, sende E-Mail...');
      await sendMailToAdmin({ timestamp, host, user, eventID, level, message });
    }

    res.status(201).json(log);
  } catch (error) {
    console.error('Fehler beim Speichern des Windows-Logs:', error);
    res.status(500).json({ message: 'Fehler beim Speichern.' });
  }
});

app.get('/api/alerts', async (req, res) => {
  try {
    const firewallLogs = await prisma.logData.findMany({
      where: { action: 'blocked' },
      orderBy: { timestamp: 'desc' }
    });

    const windowsLogs = await prisma.windowsLog.findMany({
      where: {
        OR: [
          { level: 'Error' },
          { eventID: 4625 }
        ]
      },
      orderBy: { timestamp: 'desc' }
    });

    const allAlerts = [...firewallLogs, ...windowsLogs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(allAlerts);
  } catch (error) {
    console.error('Fehler beim Abrufen der Alerts:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen der kritischen Logs.' });
  }
});

// Monatsstatistik
app.get('/api/attack-stats/monthly', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT TO_CHAR("timestamp", 'Mon YYYY') AS monat, COUNT(*) AS anzahl
      FROM "LogData"
      WHERE "action" = 'blocked'
      GROUP BY monat
      ORDER BY MIN("timestamp");
    `;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Monatsstatistik' });
  }
});

// Angriffsarten-Statistik
app.get('/api/attack-stats/types', async (req, res) => {
  try {
    const result = await prisma.$queryRaw`
      SELECT "reason", COUNT(*) AS anzahl
      FROM "LogData"
      WHERE "action" = 'blocked'
      GROUP BY "reason"
      ORDER BY anzahl DESC;
    `;
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Fehler beim Abrufen der Angriffsarten' });
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
