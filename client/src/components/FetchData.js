import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const LocationPicker = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  // Use the provided API key
  const apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';
  
  const headers = {
    'X-CSCAPI-KEY': apiKey,
  };

  // Fetch provinces (states/regions) in Canada
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          'https://api.countrystatecity.in/v1/countries/CA/states',
          { headers }
        );
        setProvinces(response.data); // update the state with provinces data
        console.log(response.data); // for debugging, remove later
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    };

    fetchProvinces();
  }, []);

  // Fetch cities based on selected province
  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/CA/states/${selectedProvince}/cities`,
            { headers }
          );
          setCities(response.data); // update the state with cities data
          console.log(response.data); // for debugging, remove later
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    } else {
      setCities([]); // reset cities when no province is selected
    }
  }, [selectedProvince]);

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      {/* Province Dropdown */}
      <select
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      >
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.iso2} value={province.iso2}>
            {province.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!selectedProvince}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>

      {/* Date Picker */}
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        placeholderText="Select a Date"
      />
    </div>
  );
};

export default LocationPicker;
