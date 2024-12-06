import React from 'react';

const Popup = ({ message, onClose, isSuccess }) => {
  return (
    <div className="popup-overlay">
      <div
        className="popup"
        style={{
          backgroundColor: isSuccess ? '#d4edda' : '#f8d7da',
          color: isSuccess ? '#155724' : '#721c24',
          border: isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
        }}
      >
        <p style={{ margin: '0', fontSize: '1rem' }}>{message}</p>
        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            backgroundColor: isSuccess ? '#155724' : '#721c24',
            color: '#ffffff',
            padding: '5px 10px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
