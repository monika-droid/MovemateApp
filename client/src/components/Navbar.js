import React from 'react';

const Navbar = ({ userType }) => (
  <header className="navbar">
    <nav className="navbar-bottom">
      <div className="navbar-logo">MoverPro</div>
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        {userType === 'mover' ? (
          <>
            <li><a href="#about">About</a></li>
            <li><a href="#my-bookings">My Bookings</a></li>
            <li><a href="#upcoming-rides">Upcoming Rides</a></li>
          </>
        ) : (
          <>
            <li><a href="#locations">Locations</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#my-reservation">My Reservation</a></li>
          </>
        )}
      </ul>
      <button className="navbar-book-btn">Book a Move</button>
    </nav>
  </header>
);

export default Navbar;
