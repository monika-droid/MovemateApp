// src/components/Footer.js
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import '../styles/styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/images/Logo.png" alt="Company Logo" /> {/* Replace with actual logo path */}
        </div>
        <nav className="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </div>

      <div className="footer-middle">
        <div className="contact-item">
          <FaPhoneAlt /> <span>999-999-9999</span>
        </div>
        <div className="contact-item">
          <FaEnvelope /> <span>movemate@gmail.com</span>
        </div>
        <div className="contact-item">
          <FaMapMarkerAlt /> <span>Kitchener, ON N2G 4M4</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Movemate Moving and Delivery | All Rights Reserved</p>
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          {/* Add more social icons if needed */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
