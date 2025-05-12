import React from 'react';
import { Link } from 'react-router-dom';
import './NavAccordion.css';

const NavAccordion = () => {
  // Benutzerrolle aus dem LocalStorage holen
  const role = localStorage.getItem("userRole");

  return (
    <nav className="navAccordion">
      {/* Links zu verschiedenen Seiten der App */}
      <Link to="/LogOverview" className="navAccordionButton">LogOverview</Link>
      <Link to="/Alarme" className="navAccordionButton">Alarme</Link>
      <Link to="/Benutzerverwaltung" className="navAccordionButton">Benutzer</Link>
      <Link to="/AttackSimulator" className="navAccordionButton">Attack Simulator</Link>
    </nav>
  );
};

export default NavAccordion;
