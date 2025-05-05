import React, { useEffect, useState } from 'react';

const AlertIcon = () => {
  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:9555/api/logs')
        .then(res => res.json())
        .then(data => {
          const now = new Date();
          const tenSecondsAgo = new Date(now.getTime() - 10000);
  
          const recentAttacks = data.filter(log => {
            return log.action === "blocked" && new Date(log.timestamp) > tenSecondsAgo;
          });
  
          setAlerts(recentAttacks);
        });
    }, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <div style={{ position: 'relative' }}>
      <span onClick={() => setOpen(!open)} style={{ cursor: 'pointer', color: 'red' }}>⚠️</span>
      {open && (
        <div style={{ position: 'absolute', top: 20, background: '#fff', border: '1px solid #ccc', padding: '10px' }}>
          <h4>Angriffsprotokolle</h4>
          <ul>
            {alerts.map((log, index) => (
              <li key={index}>
                {log.reason} von {log.source_ip} an {log.destination_ip} ({log.timestamp})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AlertIcon;
