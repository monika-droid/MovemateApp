import React from 'react';

const AboutUs = () => (
  <section className="about-section">
    <div className="about-image">
      <img src="/images/L-1.jpg" alt="Movers with boxes" />
      <div className="about-overlay">More than 300k projects were completed</div>
    </div>
    <div className="about-content">
      <h2>About Us</h2>
      <h1>Free yourself from the usual burdens of moving.</h1>
      <p>By choosing MoverPro, you’re guaranteeing a great moving day.</p>
      <ul>
        <li><strong>Friendly:</strong> Tailored moving help.</li>
        <li><strong>Professional:</strong> Efficient and careful service.</li>
        <li><strong>Efficient:</strong> Digital management of the experience.</li>
      </ul>
      <button className="about-button">Book a Move</button>
      <button className="about-contact-btn">📞 +1 (866) 970-4583</button>
    </div>
  </section>
);

export default AboutUs;
