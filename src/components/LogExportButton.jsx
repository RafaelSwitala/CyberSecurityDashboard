import React from 'react';

// Komponente zum Exportieren von Log-Daten als JSON-Datei
const LogExportButton = ({ logs, timeFilter }) => {

  // Funktion zur Berechnung des Zeitstempels, ab dem Logs berücksichtigt werden sollen
  const getTimeThreshold = filter => {
    const now = new Date();
    switch (filter) {
      case '1h': return new Date(now.getTime() - 1 * 60 * 60 * 1000);
      case '6h': return new Date(now.getTime() - 6 * 60 * 60 * 1000);
      case '1d': return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '1w': return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case '1m': return new Date(now.setMonth(now.getMonth() - 1));
      case '1y': return new Date(now.setFullYear(now.getFullYear() - 1));
      default: return null;
    }
  };

  // Funktion zum Exportieren der Logs als JSON-Datei
  const exportToJSON = () => {
    const threshold = getTimeThreshold(timeFilter);
    // Logs filtern, wenn ein Zeitfilter aktiv ist
    const filtered = threshold
      ? logs.filter(log => new Date(log.timestamp) >= threshold)
      : logs;

    // Logs als JSON-String formatieren
    const json = JSON.stringify(filtered, null, 2);
    // Blob-Objekt aus dem JSON erzeugen
    const blob = new Blob([json], { type: 'application/json' });
    // URL für den Download erstellen
    const url = URL.createObjectURL(blob);

    // Temporärer Link zum Auslösen des Downloads
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs_${timeFilter || 'ALL'}.json`; // Dateiname je nach Filter
    document.body.appendChild(link);
    link.click();                    // Download starten
    document.body.removeChild(link); // Link entfernen
    URL.revokeObjectURL(url);        // URL wieder freigeben
  };

  return (
    // Button, der beim Klicken den Export auslöst
    <button className="logOverviewTableButtons importExportButton" onClick={exportToJSON}>
      Export als JSON
    </button>
  );
};

export default LogExportButton;
