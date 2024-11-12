// src/components/HeroSection.js
import React, { useState } from 'react';
import '../styles/styles.css';

function HeroSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    serviceType: '',
    residentialOrCommercial: '',
    numberOfRooms: '',
    movingFrom: '',
    movingTo: '',
    movingDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h3 className="hero-subtitle">HIRE LOCAL MOVERS WHO CARE</h3>
        <h1 className="hero-title">The Top Rated Los Angeles Moving Company</h1>
        <button className="hero-button">OUR SERVICES</button>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="(404) 555-0156"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@company.com"
          />
        </div>
        <div className="form-group">
          <label>Service interested in</label>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
            <option value="Moving">Moving</option>
            <option value="Packing">Packing</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
        <div className="form-group">
          <label>Where Are You Moving From?</label>
          <input
            type="text"
            name="movingFrom"
            value={formData.movingFrom}
            onChange={handleChange}
            placeholder="From"
          />
        </div>
        <div className="form-group">
          <label>Where Are You Moving To?</label>
          <input
            type="text"
            name="movingTo"
            value={formData.movingTo}
            onChange={handleChange}
            placeholder="To"
          />
        </div>
        <div className="form-group">
          <label>Moving Date</label>
          <input
            type="date"
            name="movingDate"
            value={formData.movingDate}
            onChange={handleChange}
            placeholder="YYYY/MM/DD"
          />
        </div>
        <button type="submit" className="submit-button">SEND</button>
      </form>
    </section>
  );
}

export default HeroSection;
