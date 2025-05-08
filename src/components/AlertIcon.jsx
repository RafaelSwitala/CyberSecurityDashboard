import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./AlertIcon.css";

const AlertIcon = () => {
  const [hasNewAlerts, setHasNewAlerts] = useState(false);
  const [userId, setUserId] = useState(null);

  const checkAlerts = async (id) => {
    try {
      const res = await fetch(`http://localhost:9555/api/alerts/unreviewed/${id}`);
      const data = await res.json();
      setHasNewAlerts(data.hasNewAlerts);
    } catch (err) {
      console.error("Fehler beim Prüfen der Alerts:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
      checkAlerts(decoded.id);

      const interval = setInterval(() => {
        checkAlerts(decoded.id);
      }, 15000); // alle 15 Sekunden prüfen

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <Link to="/alarme" className="alertIcon">
      <div className="icon" />
      {hasNewAlerts && (
        <span className="alertText">⚠ Neue Alerts verfügbar</span>
      )}
    </Link>
  );
}

export default AlertIcon;
