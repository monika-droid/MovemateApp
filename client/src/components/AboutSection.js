// src/components/AboutSection.js
import React from 'react';
import '../styles/styles.css';

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h3 className="about-subtitle">THE #1 RATED MOVERS</h3>
        <h2 className="about-title">Moving Company in Los Angeles</h2>
        <p className="about-description">
          We’re a Los Angeles moving company providing LA locals with high quality, affordable moving services.
          Pronto Moving & Delivery Services can help you move it all, from large furniture to small fragile items.
          Our moving company has been staffed with the top movers in LA for business and regular moving services since 1998.
          Our licensed and insured local movers have served the Los Angeles, CA area for over 20 years.
          Whether you’re moving to a new house, office, or simply transporting furniture, our dedicated movers and
          dependable equipment can make your move easy and completely stress-free.
        </p>
        <div className="about-buttons">
          <a href="#contact" className="button contact-button">CONTACT US</a>
          <a href="#services" className="button services-button">OUR SERVICES</a>
        </div>
      </div>
      
      <div className="about-image"></div> {/* Empty div for background image */}
    </section>
  );
}

export default AboutSection;
