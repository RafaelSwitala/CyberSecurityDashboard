const fs = require('fs');
const axios = require('axios');
const path = require('path');
const config = require('./config.json');

const {
  SEND_TO_API,       // Boolean: Gibt an, ob die Logs an eine API gesendet werden sollen
  API_URL,           // Ziel-URL für die API
  INTERVAL_MS,       // Intervall für Log-Generierung (in Millisekunden)
  ATTACK_CHANCE,     // Wahrscheinlichkeit für eine "Attacke"
  protocols,         // Liste erlaubter Protokolle (z. B. TCP, UDP)
  reasons,           // Liste möglicher Angriffsgründe
  ports              // Liste von verwendeten Ports
} = config;

// Funktion zur Generierung eines zufälligen Log-Eintrags
function generateLog() {
  const attack = Math.random() < ATTACK_CHANCE;

  return {
    timestamp: new Date().toISOString(), // Aktueller Zeitstempel
    source_ip: `192.168.1.${Math.floor(Math.random() * 100 + 100)}`,
    destination_ip: `10.0.0.${Math.floor(Math.random() * 10 + 1)}`,
    port: ports[Math.floor(Math.random() * ports.length)],
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    action: attack ? "blocked" : "allowed",
    reason: attack
      ? reasons[Math.floor(Math.random() * (reasons.length - 1) + 1)] 
      : "normal traffic"
  };
}

// Funktion zum Speichern des Logs in eine Datei im NDJSON-Format
function writeToFile(log) {
  const filePath = path.join(__dirname, '../public/generated_logs.ndjson');
  fs.appendFile(filePath, JSON.stringify(log) + '\n', err => {
    if (err) console.error("Fehler beim Schreiben:", err);
  });
}

function sendToApi(log) {
  const payload = {
    message: log.reason,
    port: log.port,
    sourceIP: log.source_ip,
    destinationIP: log.destination_ip,
    protocol: log.protocol,
    action: log.action,
    reason: log.reason,
    timestamp: log.timestamp
  };

  // POST-Anfrage an die API senden
  axios.post(API_URL, payload)
    .then(res => console.log(`Gesendet (${res.status})`)) 
    .catch(err => {
      console.error("Fehler beim Senden:");
      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Daten:", err.response.data);
      } else if (err.request) {
        console.error("Request wurde gesendet, aber keine Antwort erhalten");
        console.error(err.request);
      } else {
        console.error("Fehler beim Erstellen der Anfrage:", err.message);
      }
    });
}

// Hauptfunktion, die regelmäßig Logs generiert und verarbeitet
function main() {
  setInterval(() => {
    const log = generateLog(); // Log erzeugen
    console.log("Log:", log);

    SEND_TO_API ? sendToApi(log) : writeToFile(log);
  }, INTERVAL_MS);
}

// Start der Anwendung
main();