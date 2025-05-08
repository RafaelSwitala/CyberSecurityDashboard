const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(cors({ origin: 'http://localhost:9000' }));
app.use(express.json());
console.log('✅ Richtiges Backend geladen: backend-with-roles.js');

// Auth-Middleware
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Kein Token' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: 'Keine Berechtigung' });
      }
      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Token ungültig' });
    }
  };
}

// Passwort-Hashing
prisma.$use(async (params, next) => {
  if (params.model === 'UserAuthentication' && ['create', 'update'].includes(params.action)) {
    const { password } = params.args.data;
    if (password) {
      params.args.data.password = await bcrypt.hash(password, 10);
    }
  }
  return next(params);
});

// Benutzer anlegen
//app.post('/api/create-user', authorizeRoles('ADMIN'), async (req, res) => {
    app.post('/api/create-user', async (req, res) => {
    const {
    username, password, role, firstName, lastName,
    address, birthday, gender, language, email, phone
  } = req.body;

  try {
    const user = await prisma.userAuthentication.create({
      data: {
        username,
        password,
        role,
        firstName,
        lastName,
        address,
        birthday: birthday ? new Date(birthday) : null,
        gender,
        language,
        email,
        phone
      }
    });
    res.status(201).json({ message: 'Benutzer erfolgreich erstellt', user });
  } catch (error) {
    console.error('❌ Fehler beim Erstellen:', error.message);
    res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers', details: error.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

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

    res.json({ token });
  } catch (err) {
    console.error('❌ Fehler beim Login:', err.message);
    res.status(500).json({ message: 'Login fehlgeschlagen', details: err.message });
  }
});

// Passwort ändern
app.post('/api/change-password', authorizeRoles('ADMIN', 'ANALYST'), async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    const user = await prisma.userAuthentication.findUnique({ where: { id: userId } });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(401).json({ message: 'Altes Passwort falsch' });
    }

    await prisma.userAuthentication.update({
      where: { id: userId },
      data: {
        password: await bcrypt.hash(newPassword, 10),
        passwordChangedAt: new Date()
      }
    });

    res.json({ message: 'Passwort erfolgreich geändert' });
  } catch (err) {
    console.error('❌ Fehler beim Passwortwechsel:', err.message);
    res.status(500).json({ message: 'Fehler beim Ändern des Passworts', details: err.message });
  }
});

// Profil aktualisieren
app.put('/api/update-profile', authorizeRoles('ADMIN', 'ANALYST'), async (req, res) => {
  const {
    firstName, lastName, address, birthday,
    gender, language, email, phone
  } = req.body;

  try {
    await prisma.userAuthentication.update({
      where: { id: req.user.id },
      data: {
        firstName,
        lastName,
        address,
        birthday: birthday ? new Date(birthday) : null,
        gender,
        language,
        email,
        phone
      }
    });

    res.json({ message: 'Profil aktualisiert' });
  } catch (err) {
    console.error('❌ Fehler beim Aktualisieren:', err);
    res.status(500).json({
      message: 'Profil konnte nicht aktualisiert werden',
      details: err.message
    });
  }
});

// Eigenes Konto löschen
app.delete('/api/delete-own-account', authorizeRoles('ADMIN', 'ANALYST'), async (req, res) => {
  try {
    await prisma.userAuthentication.delete({
      where: { id: req.user.id }
    });
    res.status(200).json({ message: 'Konto gelöscht' });
  } catch (err) {
    console.error('❌ Fehler beim Kontolöschen:', err.message);
    res.status(500).json({ message: 'Konto konnte nicht gelöscht werden' });
  }
});

// 📥 Logs abrufen mit optionalem Zeitraum + JSON-Export
app.get('/api/logs', authorizeRoles('ADMIN', 'ANALYST'), async (req, res) => {
    const { from, to } = req.query;
  
    try {
      const filters = {};
      if (from || to) {
        filters.timestamp = {};
        if (from) filters.timestamp.gte = new Date(from);
        if (to) filters.timestamp.lte = new Date(to);
      }
  
      const logs = await prisma.logData.findMany({
        where: filters,
        orderBy: { timestamp: 'desc' }
      });
  
      res.setHeader('Content-Disposition', 'attachment; filename="logs.json"');
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(logs, null, 2));
    } catch (err) {
      console.error('❌ Fehler beim Laden der Logs:', err.message);
      res.status(500).json({ message: 'Logs konnten nicht geladen werden' });
    }
  })

// Prisma schließen
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});
app.get('/api/logs', authorizeRoles('ADMIN', 'ANALYST'), async (req, res) => {
    try {
      const logs = await prisma.logData.findMany({
        orderBy: { timestamp: 'desc' },
        take: 20
      });
      res.json(logs);
    } catch (err) {
      console.error('❌ Fehler beim Laden der Logs:', err.message);
      res.status(500).json({ message: 'Logs konnten nicht geladen werden' });
    }
  });
  
// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
