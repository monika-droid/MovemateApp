import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import '../styles/styles.css';

const NavigationBar = ({ role }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="success" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        {/* Updated Navbar Brand to use the logo */}
        <Navbar.Brand href="/">
          <img
            src="/images/Logo.png"
            alt="MoveMate Logo"
            height="40" /* Adjust the height as needed */
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {role === 'customer' ? (
              <>
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/bookings" className="nav-link">My Bookings</Link>
              </>
            ) : (
              <>
                <Link to="/movers" className="nav-link">Dashboard</Link>
                <Link to="/mover-bookings" className="nav-link">My Bookings</Link>
              </>
            )}
          </Nav>
          <Button variant="light" onClick={() => navigate('/login')}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
