import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

const NavBar = ({ username, userId, onLogout }) => {
  // Zustand für das Dropdown-Menü (offen oder geschlossen)
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Zustand, ob unüberprüfte Alarme vorhanden sind
  const [hasUnreviewedAlerts, setHasUnreviewedAlerts] = useState(false);
  // useNavigate wird verwendet, um nach dem Logout auf die Startseite zu navigieren
  const navigate = useNavigate();

  // useEffect wird verwendet, um bei Änderung der userId die Alarme zu prüfen
  useEffect(() => {
    // Funktion, um den Status der unüberprüften Alarme zu holen
    const fetchAlertStatus = async () => {
      if (!userId) return; // Wenn keine Benutzer-ID vorhanden, wird nichts gemacht

      try {
        // Anfrage an den Server, um den Status der unüberprüften Alarme zu holen
        const res = await axios.get(`http://localhost:9555/api/alerts/unreviewed/${userId}`);
        setHasUnreviewedAlerts(res.data.hasNewAlerts);
      } catch (err) {
        console.error('Fehler beim Alert-Check:', err);
      }
    };

    fetchAlertStatus();
    // Alle 30 Sekunden wird der Status der Alarme erneut geprüft
    const interval = setInterval(fetchAlertStatus, 30000);

    // Intervall beim Verlassen der Komponente entfernen
    return () => clearInterval(interval);
  }, [userId]); // useEffect wird bei Änderung der userId erneut ausgeführt

  // Funktion zum Abmelden des Benutzers
  const handleLogout = () => {
    onLogout(); // onLogout wird aufgerufen
    navigate('/'); // Nach dem Abmelden zur Startseite navigieren
  };

  return (
    <nav className="navBar">
      {/* Link zur Startseite über das Logo */}
      <Link to="/" className="logoLink">
        <div className="logoField" />
      </Link>

      {/* Abschnitt für Alarme */}
      <div className="alerts">
        <Link to="/alarme" className="alertLink">
          🔔 Alarme
          {/* Wenn unüberprüfte Alarme vorhanden sind, wird eine Benachrichtigung angezeigt */}
          {hasUnreviewedAlerts && (
            <strong className="alertNotice">Neue Alerts verfügbar</strong>
          )}
        </Link>
      </div>

      {/* Benutzername anzeigen und Dropdown-Menü für Benutzeraktionen */}
      {username && (
        <div className="userMenu" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="userNameField" />
          {username}
          {/* Dropdown-Menü anzeigen, wenn das Menü geöffnet ist */}
          {dropdownOpen && (
            <div className="dropdownMenu">
              <Link to="/profile" className="dropdownItem">Profil</Link>
              <div className="dropdownItem" onClick={handleLogout}>Abmelden</div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
