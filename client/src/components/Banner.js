// Banner.js
import React from 'react';
import '../styles/styles.css';

const Banner = ({ onGetQuotation }) => (
  <div className="banner-content">
    <h2>Your Reliable Moving Partner</h2>
    <p>Get a quote now for a hassle-free moving experience!</p>
    <button onClick={onGetQuotation} className="banner-button">Get Quotation</button>
  </div>
);

export default Banner;
