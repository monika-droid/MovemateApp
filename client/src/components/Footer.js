// src/components/Footer.js
import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import '../styles/styles.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/path/to/logo.png" alt="Company Logo" /> {/* Replace with actual logo path */}
        </div>
        <nav className="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </div>

      <div className="footer-middle">
        <div className="contact-item">
          <FaPhoneAlt /> <span>310-562-0608</span>
        </div>
        <div className="contact-item">
          <FaEnvelope /> <span>prontomoving@gmail.com</span>
        </div>
        <div className="contact-item">
          <FaMapMarkerAlt /> <span>Los Angeles, CA 90019</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 Pronto Moving and Delivery | All Rights Reserved</p>
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
