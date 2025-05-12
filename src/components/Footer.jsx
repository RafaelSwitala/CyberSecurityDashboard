import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        
        <div className='footer-left'>
          <p><strong>CyberSecurity Dashboard</strong></p>
          <p>Fallstudie Software Engineering</p>
          <p>IU Internationale Hochschule</p>
          <p>Prof. Alex Büchner</p>
        </div>

        <div className='footer-center'>
          <p>Entwickelt von:</p>
          <ul>
            <li>Atakan Cevke</li>
            <li>Aziz Mert Bektas</li>
            <li>Rafael Switala</li>
          </ul>
        </div>

        <div className='footer-right'>
          {/* Dynamisch das aktuelle Jahr anzeigen */}
          <p>&copy; {new Date().getFullYear()} Cybersecurity Dashboard</p>
          
          <a 
            href='https://github.com/RafaelSwitala/CyberSecurityDashboard/' 
            target='_blank' 
            rel='noopener noreferrer'
          >
            GitHub Repository
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
