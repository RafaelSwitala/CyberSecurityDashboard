const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

// Destrukturierung der Konfigurationswerte aus config.json
const {
  SEND_TO_API,
  API_URL,
  INTERVAL_MS,
  events,
  hosts,
  users
} = config;

// Funktion zur Generierung eines simulierten Windows-Logeintrags
function generateWindowsLog() {
  const event = events[Math.floor(Math.random() * events.length)];   // Zufälliges Ereignis wählen
  const host = hosts[Math.floor(Math.random() * hosts.length)];      // Zufälliger Host
  const user = users[Math.floor(Math.random() * users.length)];      // Zufälliger Benutzer

  return {
    timestamp: new Date().toISOString(),
    host,
    user,
    eventID: event.eventID,
    level: event.level,
    message: event.message
  };
}

// Funktion zum Speichern des Logs in einer Datei im NDJSON-Format
function writeToFile(log) {
  const filePath = path.join(__dirname, '../../../public/windows-logs.ndjson');
  const dir = path.dirname(filePath); // Verzeichnis ermitteln

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Log-Zeile an die Datei anhängen
  fs.appendFile(filePath, JSON.stringify(log) + '\n', err => {
    if (err) console.error('Fehler beim Schreiben:', err);
    else console.log('Windows-Log gespeichert (Datei)');
  });
}

// Funktion zum Senden des Logs an die API
function sendToApi(log) {
  axios.post(API_URL, log)
    .then(res => console.log(`Gesendet an API (${res.status})`))
    .catch(err => {
      console.error("Fehler beim Senden:");
      if (err.response) {
        // Server hat geantwortet, aber mit einem Fehlerstatus
        console.error("Status:", err.response.status);
        console.error("Daten:", err.response.data);
      } else if (err.request) {
        // Anfrage wurde gesendet, aber keine Antwort erhalten
        console.error("Keine Antwort erhalten");
      } else {
        // Fehler beim Erstellen der Anfrage
        console.error("Fehler:", err.message);
      }
    });
}

// Hauptfunktion: Erzeugt und verarbeitet Logs in regelmäßigen Abständen
function main() {
  setInterval(() => {
    const log = generateWindowsLog();
    console.log("Log:", log);
    sendToApi(log);
    writeToFile(log);
  }, INTERVAL_MS);
}

// Start der Anwendung
main();
