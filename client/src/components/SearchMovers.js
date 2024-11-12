import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const SearchMovers = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(null);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [movers, setMovers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';
  const headers = { 'X-CSCAPI-KEY': apiKey };

  // Fetch provinces when the component mounts
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          'https://api.countrystatecity.in/v1/countries/CA/states',
          { headers }
        );
        setProvinces(response.data);
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch cities when a province is selected
  useEffect(() => {
    if (province) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/CA/states/${province}/cities`,
            { headers }
          );
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [province]);

  const handleSearch = async () => {
    if (!date || !city) {
      alert("Please select a date and a city.");
      return;
    }

    try {
      setIsLoading(true);
      const formattedDate = date.toISOString().split('T')[0];
      const response = await apiService.get(`/searchMovers?date=${formattedDate}&location=${city}`);
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

        <label>Select Province:</label>
        <select
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setCity('');
          }}
          required
        >
          <option value="">Select Province</option>
          {provinces.map((prov) => (
            <option key={prov.iso2} value={prov.iso2}>
              {prov.name}
            </option>
          ))}
        </select>

        <label>Select City:</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!province}
          required
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

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


