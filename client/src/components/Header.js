import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Header({ userType, onNavigate }) {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileDropdown = () => setProfileDropdownOpen(!profileDropdownOpen);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login'); 
  };

  const handleLogoClick = () => {
    if (userType === 'mover') {
      navigate('/mover'); // Redirect to mover home page
    } else {
      navigate('/user'); // Redirect to user home page
    }
  };

  return (
    <header className="header">
      <div className="header-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <img src="/images/Logo.png" alt="Logo" /> {/* Replace with actual logo path */}
      </div>

      <nav className="header-nav">
        {userType !== 'mover' && (
          <>
            <Link to="#" onClick={() => onNavigate('about')}>About Us</Link>
            <NavLink to="/getquotation" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Get Quotation
            </NavLink>
            <Link to="/user/approved-rides">Approved Rides</Link> {/* New link for Approved Rides */}
            <Link to="/my-reservation">My Reservation</Link>
            <Link to="#" onClick={() => onNavigate('chooseUs')}>Our Services</Link>
          </>
        )}
        {userType === 'mover' ? (
          <>
            <NavLink to="/mover" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Availability
            </NavLink>
            <NavLink to="/mover/requested-rides" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Requested Rides
            </NavLink>
            <NavLink to="/mover/confirmed-rides" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Confirmed Rides
            </NavLink>
          </>
        ) : null}
      </nav>

      <div className="header-actions">
        {userType !== 'mover' && (
          <button
            className="booking-button"
            onClick={() => onNavigate('searchMovers')}
          >
            Book a Move
          </button>
        )}
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
