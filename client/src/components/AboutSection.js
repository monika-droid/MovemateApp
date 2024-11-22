// src/components/AboutSection.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h3 className="about-subtitle">THE #1 RATED MOVERS</h3>
        <h2 className="about-title">Moving Company in Kitchener</h2>
        <p className="about-description">
        At MOVEMATE, we believe moving should be simple, stress-free, and tailored to your needs. Our mission is to transform the way people move by connecting them with reliable, professional movers through a user-friendly platform. Whether it’s a local move or a cross-country relocation, we’re here to make the process seamless and hassle-free, one move at a time. With MOVEMATE, you’re not just moving—you’re moving smarter.  
        </p>
      </div>
      
      <div className="about-image"></div> {/* Empty div for background image */}
    </section>
  );
}

export default AboutSection;
