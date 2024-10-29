import React, { useState } from 'react';
import '../styles/styles.css';

const BookingPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    movingFrom: '',
    movingTo: '',
    moveDate: '',
    service: '',
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = () => {
    alert('Thank you for submitting your request!');
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Get Quotation</h3>
        <input
          name="movingFrom"
          placeholder="Moving From"
          onChange={handleChange}
        />
        <input
          name="movingTo"
          placeholder="Moving To"
          onChange={handleChange}
        />
        <input
          type="date"
          name="moveDate"
          onChange={handleChange}
        />
        <input
          name="service"
          placeholder="Service Required"
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default BookingPopup;
