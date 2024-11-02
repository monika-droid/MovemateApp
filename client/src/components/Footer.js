import React from 'react';

const Footer = ({ userType }) => (
  <footer className="footer-section">
    {userType === 'customer' ? (
      <div className="footer-content">
        <div className="footer-logo">
          <h3>Mover Pro</h3>
          <p>By choosing Mover Pro, you’re guaranteeing a great moving day. All customers receive transparent pricing and flexible service options.</p>
          <button className="footer-read-more">Read More &gt;</button>
          <div className="footer-social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🔗</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🔗</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">🔗</a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Services</h4>
            <a href="#moving-services">Moving Services</a>
            <a href="#cost-calculator">Moving Cost Calculator</a>
            <a href="#local-moving">Local Moving</a>
            <a href="#long-distance">Long Distance Moving</a>
            <a href="#hourly-labor">Hourly Labor</a>
            <a href="#apartment-moving">Apartment Moving</a>
            <a href="#last-minute">Last Minute Moving</a>
            <a href="#commercial-moving">Commercial Moving</a>
          </div>

          <div className="footer-column">
            <h4>About</h4>
            <a href="#press">Press</a>
            <a href="#partnerships">Partnerships</a>
            <a href="#scholarship">Scholarship</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="footer-column">
            <h4>Contact</h4>
            <a href="#blog">Blog</a>
            <a href="#city-guides">City Guides</a>
            <a href="#move-prep">Preparing for Your Move</a>
            <a href="#insurance">Certificate of Insurance</a>
          </div>
        </div>
      </div>
    ) : (
      <div className="footer-bottom">
        <p>&copy; 2023 Mover Pro. All rights reserved.</p>
      </div>
    )}
  </footer>
);

export default Footer;
