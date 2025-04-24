import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navBar">
      <Link to="/" className="logoLink">
        <div className="logoField" />
      </Link>
    </nav>
  );
};

export default NavBar;
