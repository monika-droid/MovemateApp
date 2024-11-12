// src/components/Dropdown.js
import React from 'react';
import '../styles/Dropdown.css';

function Dropdown({ children }) {
  return (
    <div className="dropdown">
      {children}
    </div>
  );
}

export default Dropdown;
