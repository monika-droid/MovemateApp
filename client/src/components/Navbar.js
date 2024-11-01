// Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import '../styles/styles.css';

const NavigationBar = ({ role }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="success" variant="dark" expand="lg" fixed="top" className="shadow">
      <Container>
        <Navbar.Brand href="/">
          <img src="/images/Logo.png" alt="MoveMate Logo" height="40" className="d-inline-block align-top" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contact" className="nav-link">Contact Us</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Sign Up</Link>
            <Link to="/movers/Bookingpage" className="nav-link">My Bookingpage</Link>
            <Link to="/movers/upcoming" className="nav-link">Upcoming Rides</Link>
          </Nav>
          <Button variant="light" className="move-now-button" onClick={() => navigate('/quote')}>
            Move Now
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
