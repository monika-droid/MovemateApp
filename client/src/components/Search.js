import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css'; // Keeping the existing styles

const SearchBar = ({ onSearch }) => {
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState(null); // State to hold search results

  const apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='; // Replace with your actual API key
  const headers = { 'X-CSCAPI-KEY': apiKey };

  // Fetch provinces on component mount
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
    const fetchCities = async () => {
      if (province) {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/CA/states/${province}/cities`,
            { headers }
          );
          setCities(response.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCities([]); // Reset cities if no province is selected
      }
    };

    fetchCities();
  }, [province]);

  const handleSearch = () => {
    // Check if all fields are filled
    if (!province || !city || !date) {
      setError('Please fill out all fields');
      return;
    }

    // Clear error
    setError('');

    // Mocked search logic for demonstration, you can customize this as needed
    const results = {
      province,
      city,
      date: new Date(date).toLocaleDateString(),
    };

    setSearchResults(results);

    // Alert or other desired actions
    alert(`Search Results:\nProvince: ${results.province}\nCity: ${results.city}\nDate: ${results.date}`);
  };

  return (
    <section className="search-movers-section">
      <h2 className="search-title">Find Trusted Movers in Your Area</h2>
      <div className="search-bar-container">
        <select
          className="search-input"
          value={province}
          onChange={(e) => setProvince(e.target.value)}
        >
          <option value="">Select Province/State</option>
          {provinces.map((prov) => (
            <option key={prov.iso2} value={prov.iso2}>
              {prov.name}
            </option>
          ))}
        </select>

        <select
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!province} // Disable until province is selected
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="search-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="search-submit-btn" onClick={handleSearch}>
          Search Movers
        </button>
      </div>

      {/* Display error message if fields are missing */}
      {error && <p className="error-message">{error}</p>}

      {/* Display search results */}
      {searchResults && (
        <div className="search-results">
          <h6>Search Results:</h6>
          <p>Province: {searchResults.province}</p>
          <p>City: {searchResults.city}</p>
          <p>Date: {searchResults.date}</p>
        </div>
      )}
    </section>
  );
};

export default SearchBar;
