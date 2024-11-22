// src/pages/GetQuotation.js
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/styles.css';

const GetQuotation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    movingFrom: '',
    movingTo: '',
    movingDate: '',
    additionalDetails: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quotation Details:', formData);
    alert('Quotation request submitted successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      movingFrom: '',
      movingTo: '',
      movingDate: '',
      additionalDetails: '',
    });
  };

  return (
    <div>
      <Header userType="customer" />
      <div className="get-quotation-container">
        <h2>Get a Free Moving Quotation</h2>
        <p className="quotation-description">
          Fill out the form below, and we’ll get back to you with a customized quote for your move.
        </p>
        <form className="get-quotation-form" onSubmit={handleSubmit} style={{ width: "auto", }}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="movingFrom">Moving From</label>
            <input
              type="text"
              id="movingFrom"
              name="movingFrom"
              value={formData.movingFrom}
              onChange={handleChange}
              placeholder="Enter your current location"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="movingTo">Moving To</label>
            <input
              type="text"
              id="movingTo"
              name="movingTo"
              value={formData.movingTo}
              onChange={handleChange}
              placeholder="Enter your destination"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="movingDate">Moving Date</label>
            <input
              type="date"
              id="movingDate"
              name="movingDate"
              value={formData.movingDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="additionalDetails">Additional Details</label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Enter any additional details"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Get Quotation
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default GetQuotation;
