import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import AvailabilityForm from '../components/AvailabilityForm';
import '../styles/styles.css';

const MoversDashboard = () => {
  const [availability, setAvailability] = useState([
    { id: 1, day: 'Monday', date: '2024-10-28', time: '09:00 AM', location: 'Kitchener' },
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleAddAvailability = (newAvailability) => {
    if (newAvailability) {
      setAvailability([...availability, newAvailability]);
    }
    setShowForm(false); // Close form after submission
  };

  const handleDelete = (id) => {
    setAvailability(availability.filter((item) => item.id !== id));
  };

  return (
    <div className="mover-dashboard">
      <Navbar role="mover" />
      <div className="banner">
        <h2>Welcome to Your Dashboard!</h2>
      </div>

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
            {availability.map((item) => (
              <tr key={item.id}>
                <td>{item.day}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.location}</td>
                <td>
                  <button className="btn btn-warning btn-sm">Edit</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="floating-button" onClick={() => setShowForm(true)}>
        +
      </button>

      {showForm && <AvailabilityForm onSubmit={handleAddAvailability} />}
    </div>
  );
};

export default MoversDashboard;
