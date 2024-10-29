import React, { useState } from 'react';
import '../styles/styles.css';

const AvailabilityForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    day: '',
    date: '',
    time: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data before submission
    if (formData.day && formData.date && formData.time && formData.location) {
      onSubmit({ ...formData, id: Date.now() }); // Add unique ID using timestamp
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Add Availability</h3>
        <form onSubmit={handleSubmit}>
          <input
            name="day"
            placeholder="Day"
            value={formData.day}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={() => onSubmit(null)}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityForm;
