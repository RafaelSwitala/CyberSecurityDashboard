import React from 'react';
import { Link } from 'react-router-dom';
import './NavAccordion.css';

const NavAccordion = () => {
  return (
    <nav className="navAccordion">
      <Link to="/LogOverview" className="navButton">LogOverview</Link>
      <Link to="/Page2" className="navButton">Alarme</Link>
      <button className="navButton">Benutzer</button>
    </nav>
  );
};

export default NavAccordion;
