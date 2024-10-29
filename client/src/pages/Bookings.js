import axios from 'axios';
import { useEffect, useState } from 'react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      alert('Failed to fetch bookings. Please try again later.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      {/* Display bookings */}
    </div>
  );
};

export default Bookings;
