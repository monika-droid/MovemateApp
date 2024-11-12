import React, { useEffect, useState } from 'react';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await apiService.get(`/userBookings/${user.email}`);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, [user.email]);

  return (
    <div>
      <h2>My Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking._id}>
            <p>Mover: {booking.moverId}</p>
            <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
            <p>Time: {booking.time}</p>
            <p>Location: {booking.location}</p>
            <p>Status: {booking.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserBookings;
