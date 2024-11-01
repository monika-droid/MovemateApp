import React from 'react';
import '../styles/styles.css';

const CustomerHome = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-top">
          <div className="navbar-contact-info">
            <span className="navbar-phone">📞 +1 (844) 502-7856</span>
            <span className="navbar-email">📧 info@moverpro.com</span>
            <span className="navbar-address">📍 2953 Wexford Way, Chapin, South Carolina</span>
          </div>
          <div className="navbar-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">🔗</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🔗</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">🔗</a>
          </div>
        </div>
        <nav className="navbar-bottom">
          <div className="navbar-logo">MoverPro</div>
          <ul className="navbar-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#locations">Locations</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#my-reservation">My Reservation</a></li>
          </ul>
          <button className="navbar-book-btn">Book a Move</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Moving Made Modern.</h1>
          <p>It doesn’t have to be a hassle to make a moving plan. Get a free quote and book with $0 down. Then, manage every aspect of your move from your online dashboard.</p>
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

      {/* Services Section */}
      <section className="services-section">
        <div className="service-card">
          <h3>Hourly labor</h3>
          <p>Increase the speed and efficiency of your move by reserving a trusted team to load, unload, or rearrange your belongings.</p>
          <button className="service-button">Learn More</button>
        </div>
        <div className="service-card">
          <h3>Local moving</h3>
          <p>Get matched with a professional driver and a team of movers who have been selected for their skills, resourcefulness, and talent.</p>
          <button className="service-button">Learn More</button>
        </div>
        <div className="service-card">
          <h3>Long distance moving</h3>
          <p>Receive a guaranteed quote with precise arrival times. Our dedicated team will ensure a seamless move.</p>
          <button className="service-button">Learn More</button>
        </div>
      </section>

      {/* Slim Tab Search for Movers Section */}
      <section className="search-movers-section">
        <form className="search-movers-form">
          <input type="text" placeholder="City" required />
          <input type="text" placeholder="Country" required />
          <input type="date" required />
          <button type="submit" className="search-submit-btn">Search</button>
        </form>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="about-image">
          <img src="/images/L-1.jpg" alt="Movers with boxes" />
          <div className="about-overlay">
            More than 300k projects were completed
          </div>
        </div>
        <div className="about-content">
          <h2>About Us</h2>
          <h1>Free yourself from the usual burdens of moving.</h1>
          <p>By choosing MoverPro, you’re guaranteeing a great moving day. All customers receive transparent pricing, flexible service options, background-checked movers, industry-best customer support, and an easy-to-access online dashboard.</p>
          <ul>
            <li><strong>Friendly:</strong> Enjoy custom-tailored moving help that meets your needs, and receive thoughtful support every step of the way.</li>
            <li><strong>Professional:</strong> Our BeMove pros move quickly but carefully from start to finish. With 200,000 moves and a 4.8/5 rating under our belt, we believe attitude matters as much as muscle.</li>
            <li><strong>Efficient:</strong> Reserve our services without the need for an in-home estimate. Manage your entire experience digitally in your online dashboard.</li>
          </ul>
          <button className="about-button">Book a Move</button>
          <button className="about-contact-btn">📞 +1 (866) 970-4583</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonial-container">
          <button className="testimonial-nav left">&#8249;</button>
          <div className="testimonial">
            <div className="testimonial-images">
              <img src="/images/L-1.jpg" alt="Customer 1" />
              <img src="/images/Logo.png" alt="Customer 2" />
              <img src="/images/R-1.jpg" alt="Customer 3" />
            </div>
            <p className="testimonial-text">
              "I've been using BeMove since 2015 and have never had a bad experience. You guys have found a way to turn what is typically a painful experience into an easy process. Thank you!"
            </p>
            <p className="testimonial-author">– Emily Thomas, Chattanooga, TN</p>
            <div className="testimonial-rating">⭐ ⭐ ⭐ ⭐ ⭐</div>
          </div>
          <button className="testimonial-nav right">&#8250;</button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="how-it-works-title">You may be wondering how it works...</h2>
        <div className="how-it-works-cards">
          <div className="how-it-works-card">
            <img src="/images/L-1.jpg" alt="Booking Process" />
            <h3>Coast through our convenient booking process.</h3>
            <p>Tell us what you need and we can match you with the most qualified team for your move.</p>
          </div>
          <div className="how-it-works-card">
            <img src="/images/L-1.jpg" alt="Guidance and Support" />
            <h3>Receive ongoing guidance and support.</h3>
            <p>From the moment you make your reservation, you'll get practical tips and assistance.</p>
          </div>
          <div className="how-it-works-card">
            <img src="/images/L-1.jpg" alt="Professional Movers" />
            <h3>Relax while your Mover pros get the job done.</h3>
            <p>Your local BeMove pros get straight to work on the day of your service.</p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer-section">
              <div className="footer-content">
          <div className="footer-logo">
            <h3>Mover Pro</h3>
            <p>By choosing Mover Pro, you’re guaranteeing a great moving day. All customers receive transparent pricing.</p>
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
        <div className="footer-bottom">
          <p>&copy; 2023 Mover Pro. All rights reserved.</p>
          <p>U.S. DOT No. 577849 | MC-15703 | Support: 1-800-289-1700</p>
        </div>
      </footer>
      
    </div>
  );
};

export default CustomerHome;
