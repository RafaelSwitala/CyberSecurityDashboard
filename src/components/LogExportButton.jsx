import React, { useState } from 'react';

const timeOptions = [
  { label: 'Letzte Stunde', value: '1h' },
  { label: 'Letzte 6 Stunden', value: '6h' },
  { label: 'Letzter Tag', value: '24h' },
  { label: 'Letzte Woche', value: '7d' },
  { label: 'Letzter Monat', value: '30d' },
  { label: 'Letztes Jahr', value: '365d' },
  { label: 'Alles', value: 'all' }
];

function getDateRange(option) {
  const now = new Date();
  if (option === 'all') return { from: null, to: null };

  const to = now;
  const from = new Date(now);

  if (option.endsWith('h')) {
    from.setHours(from.getHours() - parseInt(option));
  } else if (option.endsWith('d')) {
    from.setDate(from.getDate() - parseInt(option));
  }

  return { from, to };
}

export default function LogExportButton() {
  const [selectedRange, setSelectedRange] = useState('24h');

  const handleExport = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Bitte zuerst einloggen.');
      return;
    }

    const { from, to } = getDateRange(selectedRange);
    const fromParam = from ? `from=${from.toISOString()}` : '';
    const toParam = to ? `&to=${to.toISOString()}` : '';
    const url = `http://localhost:3000/api/logs?${fromParam}${toParam}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Export fehlgeschlagen');
      }

      const blob = await response.blob();
      const urlBlob = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = urlBlob;
      a.download = 'logs.json';
      a.click();
    } catch (err) {
      alert('Fehler beim Herunterladen: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', background: '#fff', maxWidth: '400px' }}>
      <h3>Log Export</h3>
      <label htmlFor="rangeSelect">Zeitraum wählen:</label>
      <select
        id="rangeSelect"
        value={selectedRange}
        onChange={(e) => setSelectedRange(e.target.value)}
        style={{ display: 'block', margin: '0.5rem 0', padding: '0.5rem', width: '100%' }}
      >
        {timeOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <button
        onClick={handleExport}
        style={{ padding: '8px 16px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px', border: 'none' }}
      >
        Logs exportieren
      </button>
    </div>
  );
}
