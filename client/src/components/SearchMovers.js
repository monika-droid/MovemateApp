import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';

const SearchMovers = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(null);
  const [location, setLocation] = useState('');
  const [movers, setMovers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!date || !location) {
      alert("Please select a date and enter a location.");
      return;
    }

    try {
      setIsLoading(true);
      const formattedDate = date.toISOString().split('T')[0];
      const response = await apiService.get(`/searchMovers?date=${formattedDate}&location=${location}`);
      setMovers(response);
    } catch (error) {
      console.error("Error fetching movers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestRide = async (mover) => {
    try {
      const requestData = {
        userId: user.email,
        moverId: mover.moverId,
        date: mover.date,
        time: mover.time,
        location: mover.location,
      };

      console.log("Requesting ride with data:", requestData);

      await apiService.post('/rideRequest', requestData);
      alert("Ride requested. Waiting for confirmation.");
    } catch (error) {
      console.error("Error requesting ride:", error);
      alert("Failed to request ride.");
    }
  };

  return (
    <div>
      <h2>Search Movers</h2>
      <div className="search-form">
        <label>Select Date:</label>
        <DatePicker
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          placeholderText="Select a date"
        />

        <label>Enter Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, Province"
        />

        <button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Movers"}
        </button>
      </div>

      {movers.length > 0 ? (
        <div className="movers-results">
          <h3>Available Movers</h3>
          <ul>
            {movers.map((mover) => (
              <li key={mover._id} className="mover-card">
                <h4>Name: {mover.name}</h4>
                <p>Vehicle Type: {mover.vehicleType}</p>
                <p>Licence Number: {mover.licenceNumber}</p>
                <p>Date and Time: {new Date(mover.date).toLocaleDateString()} at {mover.time}</p>
                <p>Location: {mover.location}</p>
                <p>Price: ${mover.price}</p>
                <button onClick={() => handleRequestRide(mover)}>Request Ride</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        isLoading ? null : <p>No movers available for the selected date and location.</p>
      )}
    </div>
  );
};

export default SearchMovers;
