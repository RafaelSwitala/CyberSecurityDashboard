import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./AlertIcon.css";

const AlertIcon = () => {
  // State zum Speichern, ob neue Alerts vorhanden sind
  const [hasNewAlerts, setHasNewAlerts] = useState(false);
  // State zum Speichern der Benutzer-ID
  const [userId, setUserId] = useState(null);

  // Funktion zum Abrufen unüberprüfter Alerts vom Server
  const checkAlerts = async (id) => {
    try {
      const res = await fetch(`http://localhost:9555/api/alerts/unreviewed/${id}`);
      const data = await res.json();
      setHasNewAlerts(data.hasNewAlerts); // Status aktualisieren
    } catch (err) {
      console.error("Fehler beim Prüfen der Alerts:", err);
    }
  };

  // useEffect wird einmal beim Laden der Komponente ausgeführt
  useEffect(() => {
    // Token aus dem Local Storage holen
    const token = localStorage.getItem("token");
    if (token) {
      // Token dekodieren und Benutzer-ID extrahieren
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      // Direkt beim Laden die Alerts prüfen
      checkAlerts(decoded.id);
      // Wiederholtes Prüfen alle 15 Sekunden
      const interval = setInterval(() => {
        checkAlerts(decoded.id);
      }, 15000); // alle 15 Sekunden

      // Intervall beim Verlassen der Komponente entfernen
      return () => clearInterval(interval);
    }
  }, []);

  return (
    // Link führt zur Seite mit den Alarmen
    <Link to="/alarme" className="alertIcon">
      <div className="icon" />
      {/* Nur anzeigen, wenn neue Alerts vorhanden sind */}
      {hasNewAlerts && (
        <span className="alertText">Neue Alerts verfügbar</span>
      )}
    </Link>
  );
};

export default AlertIcon;
