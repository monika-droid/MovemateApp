// PopupForm.js
import React, { useState } from 'react';

const PopupForm = ({ closePopup }) => {
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
    // Submit form data to server and refresh the dashboard
    closePopup();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Add Availability</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="day" placeholder="Day" onChange={handleChange} required />
          <input type="date" name="date" onChange={handleChange} required />
          <input type="time" name="time" onChange={handleChange} required />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
          <button type="submit">Add</button>
        </form>
        <button onClick={closePopup}>Close</button>
      </div>
    </div>
  );
};

export default PopupForm;
