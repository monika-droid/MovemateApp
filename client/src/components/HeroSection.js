import React from 'react';

const HeroSection = () => (
  <section className="hero-section">
    <div className="hero-content">
      <h1>Moving Made Modern.</h1>
      <p>It doesn’t have to be a hassle to make a moving plan. Get a free quote and book with $0 down.</p>
      <button className="hero-button">See Pricing</button>
    </div>
    <div className="hero-form">
      <h2>Request a Free Quote Today!</h2>
      <form>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email Address" />
        <input type="tel" placeholder="Phone Number" />
        <button type="submit">Continue</button>
      </form>
    </div>
  </section>
);

export default HeroSection;
