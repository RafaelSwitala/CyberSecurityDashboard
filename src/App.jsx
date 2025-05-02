import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './Login';
import NavAccordion from './components/NavAccordion';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LogOverview from './pages/LogOverview';
import Page2 from './pages/Page2';
import Benutzer from './pages/Benutzer';
import AttackSimulator from './tools/AttackSimulator';
import { jwtDecode } from 'jwt-decode';
import UserManagement from './pages/UserManagement';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('userRole');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('isAuthenticated', 'true');
    const role = localStorage.getItem('userRole');
  setIsAuthenticated(true);
  setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div>
      <NavBar username={username} onLogout={handleLogout} />
      </div>
      <div className='mainPage'>
          <NavAccordion />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/LogOverview" element={<LogOverview />} />
            <Route path="/Page2" element={<Page2 />} />
            {userRole === 'ADMIN' && (
            <Route path="/Benutzerverwaltung" element={<UserManagement />} />
          )}
          </Routes> 
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};


export default App;
