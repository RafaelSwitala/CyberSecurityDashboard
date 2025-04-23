import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './Login';
import NavAccordion from './components/NavAccordion';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import LogOverview from './pages/LogOverview';
import Page2 from './pages/Page2';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <div>
        <NavBar />
      </div>
      <div className='mainPage'>
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
