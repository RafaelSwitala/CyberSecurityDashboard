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
// import TaskOverview from './pages/TaskOverview';
// import UserManagement from './pages/UserManagement';
import Benutzer from './pages/Benutzer';
import { jwtDecode } from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
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

  const handleLogin = (token) => {
    const decoded = jwtDecode(token);
    setIsAuthenticated(true);
    setUsername(decoded.username);
    setUserRole(decoded.role);
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <NavBar username={username} onLogout={handleLogout} />
      <div className="mainPage">
        <NavAccordion />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/LogOverview" element={<LogOverview />} />
          <Route path="/AttackSimulator" element={<AttackSimulator />} />
          {/* <Route path="/Page2" element={<UserProfile />} /> */}
          {userRole === 'ADMIN' && (
            <Route path="/Benutzerverwaltung" element={<Benutzer />} />
          )}
            <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
