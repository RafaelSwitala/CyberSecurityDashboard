const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { sendMailToAdmin } = require('./mailer');

const app = express();
const PORT = process.env.PORT || 9555;
const prisma = new PrismaClient();

app.use(cors({ origin: 'http://localhost:9000' }));
app.use(express.json());
console.log('Server-Setup beginnt...');

// Passwort-Hashing für Prisma
prisma.$use(async (params, next) => {
  if (params.model === 'UserAuthentication' && ['create', 'update'].includes(params.action)) {
    const { password } = params.args.data;
    if (password) {
      params.args.data.password = await bcrypt.hash(password, 10);
    }
  }
  return next(params);
});

// Benutzer registrieren
app.post('/api/create-user', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !['ADMIN', 'ANALYST'].includes(role)) {
    return res.status(400).json({ message: 'Ungültige Eingabedaten.' });
  }

  try {
    const user = await prisma.userAuthentication.create({
      data: { username, password, role }
    });

    // JSON-Profildatei speichern
    const userDir = path.join(__dirname, '../public/userData');
    if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });

    const filePath = path.join(userDir, `${username}.json`);
    await fs.promises.writeFile(filePath, JSON.stringify({ Username: username, Userrolle: role }, null, 2));

    res.status(201).json({ message: 'Benutzer erfolgreich erstellt', user });
  } catch (error) {
    console.error('Fehler beim Erstellen des Benutzers:', error);
    res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers' });
  }
});

// Benutzerprofil abrufen
app.get('/api/user-profile/:username', async (req, res) => {
  const filePath = path.join(__dirname, '../public/userData', `${req.params.username}.json`);
  try {
    const fileData = await fs.promises.readFile(filePath, 'utf-8');
    res.json(JSON.parse(fileData));
  } catch (error) {
    res.status(404).json({ message: 'Benutzerprofil nicht gefunden' });
  }
});

// Benutzerprofil speichern
app.post('/api/user-profile/:username', async (req, res) => {
  const filePath = path.join(__dirname, '../public/userData', `${req.params.username}.json`);
  try {
    await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2));
    res.status(200).json({ message: 'Benutzerprofil gespeichert' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Speichern' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich.' });

  try {
    const user = await prisma.userAuthentication.findUnique({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Ungültige Anmeldedaten' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Login' });
  }
});

// Benutzer löschen
app.delete('/api/delete-user/:id', async (req, res) => {
  try {
    await prisma.userAuthentication.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Benutzer gelöscht' });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Löschen des Benutzers' });
  }
});

// Benutzerliste
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.userAuthentication.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Abrufen der Benutzer' });
  }
});

// Log speichern
app.post('/api/logs', async (req, res) => {
  const { message, port, sourceIP, destinationIP, protocol, action, reason } = req.body;
  if (!message || !port || !sourceIP || !destinationIP || !protocol || !action || !reason) {
    return res.status(400).json({ message: 'Alle Logfelder sind erforderlich.' });
  }

  try {
    const log = await prisma.logData.create({ data: { message, port, sourceIP, destinationIP, protocol, action, reason } });

    if (action === 'blocked') {
      await sendMailToAdmin({ message, port, sourceIP, destinationIP, protocol, action, reason, timestamp: new Date().toISOString() });
    }

    res.json(log);
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Speichern des Logs' });
  }
});

// Logs abrufen & Brute-Force Alerts analysieren
app.get('/api/logs', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../public/tools', 'attackLogs.ndjson');
    if (!fs.existsSync(filePath)) return res.json({ logs: [], alerts: [] });

    const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
    const logs = fileContent.split('\n').map(line => JSON.parse(line));
    const bruteForce = logs.filter(log => log.reason?.includes("Brute Force")).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const alerts = [];
    let cluster = [];

    for (let i = 0; i < bruteForce.length; i++) {
      cluster.push(bruteForce[i]);
      const start = new Date(cluster[0].timestamp).getTime();
      const end = new Date(bruteForce[i].timestamp).getTime();

      if (end - start > 10000 || i === bruteForce.length - 1) {
        if (cluster.length >= 10) {
          alerts.push({ reason: 'Brute Force Login', count: cluster.length, time: new Date(cluster[0].timestamp).toLocaleString() });
        }
        cluster = [bruteForce[i]];
      }
    }

    res.json({ logs, alerts });
  } catch (error) {
    res.status(500).json({ message: 'Fehler beim Verarbeiten der Logs' });
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
  
  // Attack Simulator Logs (in Datei)
  app.post('/api/simulated-log', async (req, res) => {
    try {
      const log = req.body;
  
      if (!log.timestamp || !log.source_ip || !log.destination_ip || !log.port || !log.protocol || !log.action || !log.reason) {
        return res.status(400).json({ message: 'Fehlende Felder in Log-Daten.' });
      }
  
      const logDir = path.join(__dirname, '../src/tools');
      if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
  
      const filePath = path.join(logDir, 'attackLogs.ndjson');
      await fs.promises.appendFile(filePath, JSON.stringify(log) + '\n');
  
      console.log(`🛡️  Angriff-Log gespeichert unter: ${filePath}`);
      res.status(200).json({ message: 'Angriff erfolgreich gespeichert.' });
    } catch (err) {
      console.error('Fehler beim Schreiben der Log-Datei:', err);
      res.status(500).json({ message: 'Fehler beim Schreiben der Datei.' });
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
  
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(PORT, () => {
  console.log(`✅ Server läuft auf http://localhost:${PORT}`);
});
