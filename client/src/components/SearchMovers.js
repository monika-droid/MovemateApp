import React from 'react';

const SearchMovers = () => (
  <section className="search-movers-section">
    <form className="search-movers-form">
      <input type="text" placeholder="City" required />
      <input type="text" placeholder="Country" required />
      <input type="date" required />
      <button type="submit" className="search-submit-btn">Search</button>
    </form>
  </section>
);

export default SearchMovers;
