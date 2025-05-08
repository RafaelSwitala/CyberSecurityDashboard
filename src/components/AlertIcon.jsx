import React from 'react'; 
import { useEffect, useState } from 'react';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

function AlertIcon() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('http://localhost:9555/api/logs');
        console.log("API-Antwort:", res.data);
        setAlerts(res.data.alerts || []);
      } catch (err) {
        console.error('Fehler beim Laden der Alerts:', err);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 8000); // alle 8 Sek. prüfen
  
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <BellAlertIcon className="h-6 w-6 text-red-500" />
      {alerts.length > 0 && (
        <div className="absolute top-8 right-0 z-50 w-64 bg-white border border-red-300 shadow-lg p-2 rounded-md text-sm">
          <ul>
            {alerts.map((alert, idx) => (
              <li key={idx} className="mb-2">
                <strong>Brute Force Login</strong><br />
                {alert.count} Versuche<br />
                am {alert.time}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}

export default AlertIcon;
