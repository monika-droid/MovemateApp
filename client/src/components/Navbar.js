// src/components/Navbar.js
import React from 'react';
import { useAuth } from '../Context/AuthContext';

const Navbar = ({ userType }) => {
  const { user, logout } = useAuth();

  return (
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
        <div className="navbar-actions">
          <button className="navbar-book-btn">Book a Move</button>
          {user && (
            <button onClick={logout} className="navbar-logout-btn">
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
