import React from 'react';

const AttackSimulator = () => {
  const API_URL = "http://localhost:9000/api/log";

  const generateLog = (reason) => ({
    timestamp: new Date().toISOString(),
    source_ip: `192.168.1.${Math.floor(Math.random() * 100 + 100)}`,
    destination_ip: `10.0.0.${Math.floor(Math.random() * 10 + 1)}`,
    port: [22, 80, 443, 3389, 53][Math.floor(Math.random() * 5)],
    protocol: ["TCP", "UDP", "HTTPS", "HTTP"][Math.floor(Math.random() * 4)],
    action: "blocked",
    reason,
  });

  const simulate = async (reason) => {
    const log = generateLog(reason);
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log)
      });
      alert(`Angriff gesendet: ${reason}`);
    } catch (err) {
      alert("Fehler beim Senden: " + err);
    }
  };

  const simulateRandom = () => {
    const reasons = ["SQL injection", "XSS attempt", "port scan", "malware", "unauthorized access"];
    simulate(reasons[Math.floor(Math.random() * reasons.length)]);
  };

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>🔐 Angriffssimulator</h1>
      <p>Simuliere gezielte Angriffe auf das Frontend</p>
      <button onClick={() => simulate('SQL injection')}>SQL Injection</button>
      <button onClick={() => simulate('port scan')}>Portscan</button>
      <button onClick={() => simulate('malware')}>Malware</button>
      <button onClick={() => simulate('unauthorized access')}>Brute Force</button>
      <button onClick={simulateRandom}>Zufälliger Angriff</button>
    </div>
  );
};

export default AttackSimulator;
