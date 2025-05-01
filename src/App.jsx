import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './Login';
import NavAccordion from './components/NavAccordion';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LogOverview from './pages/LogOverview';
import Page2 from './pages/Page2';
import { jwtDecode } from 'jwt-decode';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          setIsAuthenticated(true);
          setUsername(decodedToken.username);
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Ungültiges Token', error);
        localStorage.removeItem('token');
      }
    }
  }, []);
  

  const handleLogin = (usernameFromToken) => {
    setIsAuthenticated(true);
    setUsername(usernameFromToken);
  };  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername('');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div>
      <NavBar username={username} onLogout={handleLogout} />
      </div>
      <div className="mainPage">
        <NavAccordion />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/LogOverview" element={<LogOverview />} />
          <Route path="/Page2" element={<Page2 />} />
        </Routes>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};


export default App;
