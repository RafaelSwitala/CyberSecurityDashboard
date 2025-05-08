import React, { useEffect, useState } from 'react';

const AlertIcon = () => {
  const [alerts, setAlerts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      if (!token) return;

      fetch('http://localhost:3000/api/logs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          if (!Array.isArray(data)) {
            console.error('Erwartetes Array, aber erhalten:', data);
            return;
          }

          const now = new Date();
          const tenSecondsAgo = new Date(now.getTime() - 10000);

          const recentAttacks = data.filter(log =>
            log.action === "blocked" && new Date(log.timestamp) > tenSecondsAgo
          );

          setAlerts(recentAttacks);
        })
        .catch(err => {
          console.error('Fehler beim Laden der Logs:', err);
        });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <span onClick={() => setOpen(!open)} style={{ cursor: 'pointer', color: 'red' }}>
        ⚠️
      </span>
      {open && (
        <div style={{
          position: 'absolute',
          top: 20,
          background: '#fff',
          border: '1px solid #ccc',
          padding: '10px'
        }}>
          <h4>Angriffsprotokolle</h4>
          {alerts.map((log, index) => (
            <div key={index}>
              <strong>{new Date(log.timestamp).toLocaleTimeString()}</strong>: {log.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertIcon;
