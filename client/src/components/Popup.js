// src/components/Popup.js
import React from 'react';

const Popup = ({ message, onClose, isSuccess }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>{isSuccess ? 'Success!' : 'Error!'}</h3>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
