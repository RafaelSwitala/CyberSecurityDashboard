import React from 'react';
import './AttackSimulator.css';
// import "../../public/"

const AttackSimulator = () => {
  const API_URL = "http://localhost:9555/api/simulated-log";

  const generateLog = (reason) => ({
    timestamp: new Date().toISOString(),
    source_ip: `192.168.1.${Math.floor(Math.random() * 100 + 100)}`,
    destination_ip: `10.0.0.${Math.floor(Math.random() * 10 + 1)}`,
    port: [22, 80, 443, 3389, 53][Math.floor(Math.random() * 5)],
    protocol: ["TCP", "UDP", "HTTPS", "HTTP"][Math.floor(Math.random() * 4)],
    action: "blocked",
    reason,
  });

  const sendLog = async (log) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(log),
      });
    } catch (err) {
      console.error("Fehler beim Senden des Logs:", err);
    }
  };

  const simulate = async (reason) => {
    const log = generateLog(reason);
    await sendLog(log);
    alert(`Angriff gesendet: ${reason}`);
  };

  const simulateAttackBurst = (reason, count = 5, duration = 10000) => {
    const interval = duration / count;
    let sent = 0;

    const sendNext = () => {
      if (sent < count) {
        sendLog(generateLog(reason));
        sent++;
        setTimeout(sendNext, interval);
      }
    };

    sendNext();
  };

  const simulateBruteForce = () => {
    const attempts = 10;
    const interval = 300;
    let count = 0;

    const attack_id = `brute-${Date.now()}`;

    const tryLogin = () => {
      if (count >= attempts) return;

      const log = {
        timestamp: new Date().toISOString(),
        source_ip: `192.168.1.50`,
        destination_ip: `10.0.0.1`,
        port: 443,
        protocol: 'HTTPS',
        action: 'blocked',
        reason: 'Brute Force Login',
        attack_id
      };

      sendLog(log);
      count++;
      setTimeout(tryLogin, interval);
    };

    tryLogin();
  };

  const simulatePortScanBurst = () => {
    const ports = [21, 22, 23, 80, 443, 445, 3389, 8080];
    const attack_id = `portscan-${Date.now()}`;

    ports.forEach((port, index) => {
      setTimeout(() => {
        const log = {
          timestamp: new Date().toISOString(),
          source_ip: '192.168.1.99',
          destination_ip: '10.0.0.2',
          port,
          protocol: 'TCP',
          action: 'blocked',
          reason: 'Port Scanning',
          attack_id
        };
        sendLog(log);
      }, index * 300);
    });
  };

  const simulateMalwareBeacon = () => {
    const beaconCount = 5;
    const interval = 2000;
    const attack_id = `malware-${Date.now()}`;
    let sent = 0;

    const beacon = () => {
      if (sent >= beaconCount) return;
      const log = {
        timestamp: new Date().toISOString(),
        source_ip: '192.168.1.200',
        destination_ip: '10.0.0.66',
        port: 443,
        protocol: 'HTTPS',
        action: 'allowed',
        reason: 'Malware Beaconing',
        attack_id
      };
      sendLog(log);
      sent++;
      setTimeout(beacon, interval);
    };

    beacon();
  };

  const simulateRandom = () => {
    const reasons = ["SQL injection", "XSS attempt", "port scan", "malware", "unauthorized access"];
    simulate(reasons[Math.floor(Math.random() * reasons.length)]);
  };

  return (
    <div className='mainPageContainer attacksimulator'>
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h1>Angriffssimulator</h1>
        <p>Simuliere gezielte Angriffe auf dein System</p>

        <button onClick={simulateBruteForce}>Brute Force Login</button>
        <button onClick={simulatePortScanBurst}>Massives Port Scanning</button>
        <button onClick={simulateMalwareBeacon}>Malware Beaconing</button>

        <hr />

        <button className='attackButton' onClick={() => simulateAttackBurst('SQL injection')}>SQL Injection (Burst)</button>
        <button className='attackButton' onClick={() => simulateAttackBurst('port scan')}>Portscan (Burst)</button>
        <button className='attackButton' onClick={() => simulate('SQL injection')}>Einzelner SQL Injection</button>
        <button className='attackButton' onClick={() => simulate('unauthorized access')}>Unautorisierter Zugriff</button>
        <button className='attackButton' onClick={simulateRandom}>Zufälliger Angriff</button>
      </div>
    </div>
  );
};

export default AttackSimulator;
