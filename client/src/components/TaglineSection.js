// src/components/TaglineSection.js
import React from 'react';
import '../styles/styles.css';

const TaglineSection = () => {
  return (
    <section className="tagline-section">
      <h2 className="tagline">Experience the Best Moving Services in LA</h2>
      <div className="cta-buttons">
        <a href="#contact" className="cta-button primary-button">Get a Free Quote</a>
        <a href="#services" className="cta-button secondary-button">Learn More</a>
      </div>
    </section>
  );
};

export default TaglineSection;
