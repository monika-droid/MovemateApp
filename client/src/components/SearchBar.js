import React, { useState } from 'react';
import '../styles/styles.css';

const SearchBar = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    onSearch({ location, date });
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="City, Country"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSearch}>Search Movers</button>
    </div>
  );
};

export default SearchBar;
