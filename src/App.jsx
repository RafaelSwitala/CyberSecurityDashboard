import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './Login';
import NavAccordion from './components/NavAccordion';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LogOverview from './pages/LogOverview';
import UserProfile from './pages/UserProfile';
import AttackSimulator from './tools/AttackSimulator';
import Alarme from './pages/Alarme';
import Benutzer from './pages/Benutzer';
import { jwtDecode } from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Hauptkomponente der Anwendung
const App = () => {
  // State für Authentifizierung und Benutzerinformationen
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Benutzer eingeloggt?
  const [userRole, setUserRole] = useState(null);                 // Rolle des Benutzers (z. B. "ADMIN")
  const [username, setUsername] = useState('');                   // Benutzername für Anzeige

  // Effekt: Beim ersten Laden prüfen, ob ein gültiger Token vorhanden ist
  useEffect(() => {
    const token = localStorage.getItem('token'); // Token aus dem lokalen Speicher holen
    if (token) {
      try {
        const decoded = jwtDecode(token); // Token dekodieren
        if (decoded.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUserRole(decoded.role);
          setUsername(decoded.username);
        } else {
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Ungültiges Token', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // Wird beim Login aufgerufen – setzt Benutzerinformationen
  const handleLogin = (token) => {
    const decoded = jwtDecode(token);
    setIsAuthenticated(true);
    setUsername(decoded.username);
    setUserRole(decoded.role);
  };

  // Wird beim Logout aufgerufen – setzt alle Auth-Daten zurück
  const handleLogout = () => {
    localStorage.removeItem('token'); // Token aus lokalem Speicher löschen
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername('');
  };

  // Falls der Benutzer nicht eingeloggt ist, wird die Login-Seite angezeigt
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  // Hauptlayout und Routing der Anwendung, wenn eingeloggt
  return (
    <div className="app-container">
      <NavBar username={username} onLogout={handleLogout} />
      
      <div className="mainPage">
        <NavAccordion />

        {/* Seiten-Routing */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/LogOverview" element={<LogOverview />} />
          <Route path="/AttackSimulator" element={<AttackSimulator />} />
          
          {/* Nur Admins dürfen diese Route sehen */}
          {userRole === 'ADMIN' && (
            <Route path="/Benutzerverwaltung" element={<Benutzer />} />
          )}
          
          <Route path="/alarme" element={<Alarme />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
