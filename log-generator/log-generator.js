const fs = require('fs');
const axios = require('axios');

const SEND_TO_API = false; // true = an API senden, false = Datei schreiben
const API_URL = 'http://localhost:8000/api/logs/live'; // ggf. anpassen
const INTERVAL_MS = 2000;
const ATTACK_CHANCE = 0.3;

const protocols = ["TCP", "UDP", "HTTP", "HTTPS"];
const reasons = ["normal traffic", "SQL injection", "XSS attempt", "port scan", "malware", "unauthorized access"];

function generateLog() {
  const attack = Math.random() < ATTACK_CHANCE;
  return {
    timestamp: new Date().toISOString(),
    source_ip: `192.168.1.${Math.floor(Math.random() * 100 + 100)}`,
    destination_ip: `10.0.0.${Math.floor(Math.random() * 10 + 1)}`,
    port: [22, 80, 443, 3389, 53][Math.floor(Math.random() * 5)],
    protocol: protocols[Math.floor(Math.random() * protocols.length)],
    action: attack ? "blocked" : "allowed",
    reason: attack ? reasons[Math.floor(Math.random() * (reasons.length - 1) + 1)] : "normal traffic"
  };
}

function writeToFile(log) {
  fs.appendFile('generated_logs.jsonl', JSON.stringify(log) + '\n', err => {
    if (err) console.error("Fehler beim Schreiben:", err);
  });
}

function sendToApi(log) {
  axios.post(API_URL, log)
    .then(res => console.log(`Gesendet (${res.status})`))
    .catch(err => console.error("Fehler beim Senden:", err.message));
}

function main() {
  setInterval(() => {
    const log = generateLog();
    console.log("Log:", log);
    SEND_TO_API ? sendToApi(log) : writeToFile(log);
  }, INTERVAL_MS);
}

main();
