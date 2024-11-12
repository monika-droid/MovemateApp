// src/components/Header.js
import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Header({ userType }) {
  const { user, logout } = useAuth(); // Get user and logout function from Auth context
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/path/to/logo.png" alt="Logo" /> {/* Replace with actual logo path */}
      </div>

      {/* Conditional Navigation Links */}
      <nav className="header-nav">
        {/* Only show these links if userType is not 'mover' */}
        {userType !== 'mover' && (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>

            <div
              className="dropdown-container"
              onMouseEnter={toggleDropdown}
              onMouseLeave={toggleDropdown}
            >
              <Link to="" className="dropdown-toggle">Services</Link>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/moving-services">Moving Services</Link>
                  <Link to="/packing-services">Packing Services</Link>
                  <Link to="/delivery-services">Delivery Services</Link>
                </div>
              )}
            </div>
          </>
        )}

        {/* Conditional Links for MoverDashboard and CustomerHome */}
        {userType === 'mover' ? (
          <>
            <Link to="/upcoming-rides">Upcoming Rides</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </>
        ) : (
          <>
            <Link to="/locations">Locations</Link>
            <Link to="/my-reservation">My Reservation</Link>
          </>
        )}

        <Link to="/contact">Contact Us</Link>
      </nav>

      <div className="header-actions">
        {/* Only show the "Book a Move" button if userType is not 'mover' */}
        {userType !== 'mover' && (
          <Link to="/book-move" className="booking-button">Book a Move</Link>
        )}

        {/* Profile Section with Conditional Dropdown */}
        <div className="profile-section" onClick={toggleProfileDropdown}>
          <FaUserCircle className="profile-icon" />
          {profileDropdownOpen && (
            <div className="profile-dropdown">
              {user ? (
                <a onClick={handleLogout}>Logout</a>
              ) : (
                <>
                  <Link to="/register" onClick={() => setProfileDropdownOpen(false)}>Register</Link>
                  <Link to="/login" onClick={() => setProfileDropdownOpen(false)}>Login</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
