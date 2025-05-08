const nodemailer = require('nodemailer');
require('dotenv').config({ path: __dirname + '/../.env' });

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // TLS (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMailToAdmin(log) {
  let subject = '🚨 Sicherheitswarnung erkannt';
  let text = '';

  if (log.sourceIP && log.destinationIP) {
    // 🔥 Firewall-Log
    subject = `🚨 Angriff erkannt von ${log.sourceIP}`;
    text = `
Ein möglicher Angriff wurde erkannt (Firewall):

🔹 Nachricht:   ${log.message}
🔹 Port:        ${log.port}
🔹 Quelle:      ${log.sourceIP}
🔹 Ziel:        ${log.destinationIP}
🔹 Protokoll:   ${log.protocol}
🔹 Grund:       ${log.reason}
🔹 Zeitpunkt:   ${log.timestamp}
    `;
  } else if (log.eventID && log.host) {
    // 🪟 Windows-Log
    subject = `🛑 Windows-Sicherheitsmeldung (${log.level}) auf ${log.host}`;
    text = `
Kritisches Windows-Log erkannt:

🔹 Host:        ${log.host}
🔹 Benutzer:    ${log.user}
🔹 EventID:     ${log.eventID}
🔹 Level:       ${log.level}
🔹 Nachricht:   ${log.message}
🔹 Zeitpunkt:   ${log.timestamp}
    `;
  } else {
    // 🧐 Unbekannter Log-Typ
    subject = '⚠️ Unbekannter Log-Typ';
    text = `Logdaten (unbekanntes Format):\n\n${JSON.stringify(log, null, 2)}`;
  }

  const mailOptions = {
    from: process.env.ALERT_EMAIL_FROM,
    to: process.env.ALERT_EMAIL_TO,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Alert-E-Mail gesendet!");
  } catch (error) {
    console.error("❌ Fehler beim Mailversand:", error.message);
  }
}

module.exports = { sendMailToAdmin };
