// server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Benutzer registrieren
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.userAuthentication.create({
    data: {
      username,
      password: hashedPassword,
      role,
    },
  });

  res.json(user);
});

// Benutzer anmelden
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.userAuthentication.findUnique({
    where: { username },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, role: user.role }, 'your_jwt_secret', {
      expiresIn: '1h',
    });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// LogData speichern
app.post('/api/logs', async (req, res) => {
  const { message, port, sourceIP } = req.body;

  const log = await prisma.logData.create({
    data: {
      message,
      port,
      sourceIP,
    },
  });

  res.json(log);
});

//config.json
/*
{
    "SEND_TO_API": false,
    "API_URL": "http://localhost:8000/api/logs/live",
    "INTERVAL_MS": 150000,
    "ATTACK_CHANCE": 0.3,
    "protocols": ["TCP", "UDP", "HTTP", "HTTPS"],
    "reasons": ["normal traffic", "SQL injection", "XSS attempt", "port scan", "malware", "unauthorized access"],
    "ports": [22, 80, 443, 3389, 53]
  }
  
  {
  "SEND_TO_API": true,
"API_URL": "http://localhost:3000/api/logs"
}
*/


// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});