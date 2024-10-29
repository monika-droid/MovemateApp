import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

const MoversBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const response = await axios.get('http://localhost:5000/api/bookings');
    setBookings(response.data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAccept = (id) => {
    alert('Ride accepted!');
    setBookings(bookings.filter((booking) => booking.id !== id));
    // Logic to add the ride to upcoming rides
  };

  const handleReject = (id) => {
    alert('Ride rejected!');
    setBookings(bookings.filter((booking) => booking.id !== id));
    // Notify customer of rejection
  };

  return (
    <div className="bookings-page">
      {bookings.map((booking) => (
        <div className="booking-card" key={booking.id}>
          <h4>{booking.customerName}</h4>
          <p>{booking.location}</p>
          <p>{booking.date}</p>
          <button onClick={() => handleAccept(booking.id)}>Accept</button>
          <button onClick={() => handleReject(booking.id)}>Reject</button>
        </div>
      ))}
    </div>
  );
};

export default MoversBookings;
