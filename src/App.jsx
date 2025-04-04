import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <div>
        <NavBar />
      </div>
      <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Page1" element={<Page1 />} />
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