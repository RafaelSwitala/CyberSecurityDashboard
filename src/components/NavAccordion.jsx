import React from 'react';
import { Link } from 'react-router-dom';
import './NavAccordion.css';

const NavAccordion = () => {
  const role = localStorage.getItem("userRole");

  return (
    <nav className="navAccordion">
      <Link to="/LogOverview" className="navAccordionButton">LogOverview</Link>
      <Link to="/Page2" className="navAccordionButton">Alarme</Link>
      <Link to="/Benutzerverwaltung" className="navAccordionButton">Benutzer</Link>
      <Link to="/AttackSimulator" className="navAccordionButton">Attack Simulator</Link>
    </nav>
  );
};

export default NavAccordion;
