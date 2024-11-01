// AvailabilityTable.js
import React from 'react';

const AvailabilityTable = () => {
  const availabilityData = [
    { day: 'Monday', date: '2024-10-30', time: '10:00 AM', location: 'City Center' },
    // ... more data
  ];

  const handleEdit = (id) => {
    // Handle edit functionality
  };

  const handleDelete = (id) => {
    // Handle delete functionality
  };

  return (
    <div className="availability-table-container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilityData.map((availability, index) => (
            <tr key={index}>
              <td>{availability.day}</td>
              <td>{availability.date}</td>
              <td>{availability.time}</td>
              <td>{availability.location}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityTable;
