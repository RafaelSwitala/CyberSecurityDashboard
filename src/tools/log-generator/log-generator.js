
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const config = require('./config.json');

const {
  SEND_TO_API,
  API_URL,
  INTERVAL_MS,
  ATTACK_CHANCE,
  protocols,
  reasons,
  ports
} = config;

function generateLog() {
  const attack = Math.random() < ATTACK_CHANCE;
  return {
    timestamp: new Date().toISOString(),
    source_ip: `192.168.1.${Math.floor(Math.random() * 100 + 100)}`,
    destination_ip: `10.0.0.${Math.floor(Math.random() * 10 + 1)}`,
    port: ports[Math.floor(Math.random() * ports.length)],
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    action: attack ? "blocked" : "allowed",
    reason: attack ? reasons[Math.floor(Math.random() * (reasons.length - 1) + 1)] : "normal traffic"
  };
}

function writeToFile(log) {
  const filePath = path.join(__dirname, '../../../public/generated_logs.ndjson');
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

  axios.post(API_URL, payload)
    .then(res => console.log(`✅ Gesendet (${res.status})`))
    .catch(err => {
      console.error("❌ Fehler beim Senden:");
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
    


function main() {
  setInterval(() => {
    const log = generateLog();
    console.log("📋 Log:", log);
  
    writeToFile(log);         // Immer in Datei schreiben
  
    if (SEND_TO_API) {        // Nur wenn erlaubt, auch senden
      sendToApi(log);
    }
  }, INTERVAL_MS);
}  

main();

