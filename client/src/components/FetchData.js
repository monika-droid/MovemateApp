import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import axios from 'axios';

const LocationPicker = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchResults, setSearchResults] = useState(null); // State to hold search results

  const apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';
  const headers = {
    'X-CSCAPI-KEY': apiKey,
  };

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

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/CA/states/${selectedProvince}/cities`,
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
  }, [selectedProvince]);

  // Function to handle search
  const onSearch = () => {
    if (!selectedProvince || !selectedCity || !selectedDate) {
      alert('Please select a province, city, and date before searching.');
      return;
    }
    
    // Mocked search logic for demonstration
    const results = {
      province: selectedProvince,
      city: selectedCity,
      date: selectedDate.toLocaleDateString(),
    };

    setSearchResults(results);
    alert(`Search Results:\nProvince: ${results.province}\nCity: ${results.city}\nDate: ${results.date}`);
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Search</h5>
          <div className="row gy-3">
            <div className="col-md-4">
              <label htmlFor="province" className="form-label">Select Province</label>
              <select
                id="province"
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="form-select"
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province.iso2} value={province.iso2}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="city" className="form-label">Select City</label>
              <select
                id="city"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="form-select"
                disabled={!selectedProvince}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="date" className="form-label">Select a Date</label>
              <div className='mt-1'>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Select a Date"
                className="form-control"
                id="date"
              />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button onClick={onSearch} className="btn btn-primary">
              Search
            </button>
          </div>

          {searchResults && (
            <div className="mt-4">
              <h6>Search Results:</h6>
              <p>Province: {searchResults.province}</p>
              <p>City: {searchResults.city}</p>
              <p>Date: {searchResults.date}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationPicker;
