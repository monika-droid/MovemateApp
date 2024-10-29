import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Carousel from '../components/Carousel';
import AboutCards from '../components/Cards';
import Banner from '../components/Banner';
import SearchBar from '../components/SearchBar';
import MoversList from '../components/MoversList';
import BookingPopup from '../components/BookingPopup';
import axios from 'axios';
import '../styles/styles.css';

const CustomerHome = () => {
  const [movers, setMovers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const API_URL = 'http://localhost:5000/api';

  const handleSearch = async (searchParams) => {
    const { location, date } = searchParams;
    try {
      const response = await axios.get(`${API_URL}/movers`, {
        params: { location, date },
      });
      setMovers(response.data);
    } catch (error) {
      console.error('Error fetching movers:', error);
      alert('Failed to fetch movers. Please try again later.');
    }
  };

  const handleBook = async (moverId) => {
    alert('Booking confirmed! You will receive a confirmation soon.');
    window.location.href = '/bookings';
  };

  return (
    <div className="customer-home">
      <div className="navbar-section">
        <Navbar role="customer" />
      </div>

      <div className="carousel-section">
        <Carousel />
      </div>

      <div className="about-cards-section">
        <AboutCards />
      </div>

      <div className="banner-section">
        <Banner onGetQuotation={() => setShowPopup(true)} />
      </div>

      <div className="search-bar-section">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="movers-list-section">
        {movers.length > 0 && <MoversList movers={movers} onBook={handleBook} />}
      </div>

      {showPopup && <BookingPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default CustomerHome;
