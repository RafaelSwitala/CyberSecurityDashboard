import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertIcon from './AlertIcon';
import UserProfile from '../pages/UserProfile';
import './NavBar.css';

const NavBar = ({ username, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  console.log('username in NavBar:', username);


  return (
    <nav className="navBar">
      <Link to="/" className="logoLink">
        <div className="logoField" />
      </Link>

      <div className="alerts">
        <AlertIcon />
      </div>

      {username && (
        <div className="userMenu" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div className="userNameField" />
          {username}
          {dropdownOpen && (
            <div className="dropdownMenu">
              <Link to="/profile" className="dropdownItem">Profil</Link>
              <div className="dropdownItem" onClick={handleLogout}>Abmelden</div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
