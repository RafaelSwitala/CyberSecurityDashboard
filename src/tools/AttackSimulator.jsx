import React from 'react';
import './AttackSimulator.css';

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

  const simulateAttackBurst = (reason, count = 5, duration = 10000) => {
    const interval = duration / count;
    let sent = 0;
  
    const sendNext = () => {
      if (sent < count) {
        simulate(reason);
        sent++;
        setTimeout(sendNext, interval);
      }
    };
  
    sendNext();
  };
  

  const simulateRandom = () => {
    const reasons = ["SQL injection", "XSS attempt", "port scan", "malware", "unauthorized access"];
    simulate(reasons[Math.floor(Math.random() * reasons.length)]);
  };

  return (
    <div className='mainPageContainer attacksimulator'>
      <div style={{ textAlign: 'center', padding: '40px' }}>
      <h1>Angriffssimulator</h1>
      <p>Simuliere gezielte Angriffe auf das Frontend</p>
      <button className='attackButton' onClick={() => simulateAttackBurst('SQL injection')}>SQL Injection</button>
      <button className='attackButton' onClick={() => simulateAttackBurst('port scan')}>Portscan</button>
      <button className='attackButton' onClick={() => simulate('SQL injection')}>SQL Injection</button>
      <button className='attackButton' onClick={() => simulate('port scan')}>Portscan</button>
      <button className='attackButton' onClick={() => simulate('malware')}>Malware</button>
      <button className='attackButton' onClick={() => simulate('unauthorized access')}>Brute Force</button>
      <button className='attackButton' onClick={simulateRandom}>Zufälliger Angriff</button>
    </div>
    </div>
    
  );
};

export default AttackSimulator;
