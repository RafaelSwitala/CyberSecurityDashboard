import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css';

const NavBar = ({ username, userId, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasUnreviewedAlerts, setHasUnreviewedAlerts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlertStatus = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(`http://localhost:9555/api/alerts/unreviewed/${userId}`);
        setHasUnreviewedAlerts(res.data.hasNewAlerts);
      } catch (err) {
        console.error('❌ Fehler beim Alert-Check:', err);
      }
    };

    fetchAlertStatus();
    const interval = setInterval(fetchAlertStatus, 30000); // alle 30 Sekunden prüfen
    return () => clearInterval(interval);
  }, [userId]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navBar">
      <Link to="/" className="logoLink">
        <div className="logoField" />
      </Link>

      <div className="alerts">
        <Link to="/alarme" className="alertLink">
          🔔 Alarme
          {hasUnreviewedAlerts && (
            <strong className="alertNotice">Neue Alerts verfügbar</strong>
          )}
        </Link>
      </div>

      {username && (
        <div className="userMenu" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="userNameField" />
          {username}
          {dropdownOpen && (
            <div className="dropdownMenu">
              <Link to="/profile" className="dropdownItem">Profil</Link>
              <div className="dropdownItem">Postfach</div>
              <div className="dropdownItem" onClick={handleLogout}>Abmelden</div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
