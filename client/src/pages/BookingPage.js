// BookingPage.js
import React from 'react';

const BookingPage = () => {
  const bookingData = [
    { id: 1, location: 'Location A', time: '10:00 AM' },
    { id: 2, location: 'Location B', time: '2:00 PM' },
    // ... more data
  ];

  const handleAccept = (id) => {
    // Logic to accept the ride
  };

  const handleDecline = (id) => {
    // Logic to decline the ride
  };

  return (
    <div>
      <h2>Your Bookingpage</h2>
      {bookingData.map((booking) => (
        <div key={booking.id} className="booking-card">
          <h3>{booking.location}</h3>
          <p>{booking.time}</p>
          <button onClick={() => handleAccept(booking.id)}>Accept</button>
          <button onClick={() => handleDecline(booking.id)}>Decline</button>
        </div>
      ))}
    </div>
  );
};

export default BookingPage;
