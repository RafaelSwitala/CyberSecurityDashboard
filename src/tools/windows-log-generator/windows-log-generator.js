const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const {
  SEND_TO_API,
  API_URL,
  INTERVAL_MS,
  events,
  hosts,
  users
} = config;

function generateWindowsLog() {
  const event = events[Math.floor(Math.random() * events.length)];
  const host = hosts[Math.floor(Math.random() * hosts.length)];
  const user = users[Math.floor(Math.random() * users.length)];

  return {
    timestamp: new Date().toISOString(),
    host,
    user,
    eventID: event.eventID,
    level: event.level,
    message: event.message
  };
}

function writeToFile(log) {
  const filePath = path.join(__dirname, '../../../public/windows-logs.ndjson');
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.appendFile(filePath, JSON.stringify(log) + '\n', err => {
    if (err) console.error('❌ Fehler beim Schreiben:', err);
    else console.log('📝 Windows-Log gespeichert (Datei)');
  });
}

function sendToApi(log) {
  axios.post(API_URL, log)
    .then(res => console.log(`📤 Gesendet an API (${res.status})`))
    .catch(err => {
      console.error("❌ Fehler beim Senden:");
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Daten:", err.response.data);
      } else if (err.request) {
        console.error("Keine Antwort erhalten");
      } else {
        console.error("Fehler:", err.message);
      }
    });
}

function main() {
  setInterval(() => {
    const log = generateWindowsLog();
    console.log("📋 Log:", log);

    sendToApi(log);      // immer an API senden
    writeToFile(log);    // immer in Datei schreiben
  }, INTERVAL_MS);
}

main();

