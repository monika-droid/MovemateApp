import React, { useState } from 'react';
import AvailabilityForm from './AvailabilityForm';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import { display } from '@mui/system';

const AvailabilitySection = ({ availability, setAvailability }) => {
  const { authToken } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddAvailability = () => setShowForm(true);

  const handleFormSubmit = async (data) => {
    if (!data) {
      setShowForm(false);
      return;
    }

    try {
      await apiService.post('/availability', data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAvailability([...availability, data]);
    } catch (error) {
      console.error('Error adding availability:', error);
    } finally {
      setShowForm(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/availability/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAvailability(availability.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting availability:', error);
    }
  };

  return (
    <section className="availability-section">
      <h2>My Availability</h2>

      {/* Check if availability exists */}
      {availability.length > 0 ? (
        <>
          <table className="availability-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Date</th>
                <th>Time</th>
                <th>Province</th>
                <th>City</th>
                <th>Price per KM</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {availability.map((item, index) => (
                <tr key={index}>
                  <td>{item.day}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.province}</td>
                  <td>{item.city}</td>
                  <td>{item.pricePerKm}</td>
                  <td>
                    <button onClick={() => setEditingIndex(index)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div style={{ textAlign: 'center', margin: '20px', fontSize: '1.2rem', color: '#555' }}>
          No availability found. Please post your availability.
        </div>
      )}

      {/* Add button visible always */}
      <button className="add-btn" onClick={handleAddAvailability}>+</button>

      {showForm && (
        <AvailabilityForm 
          onSubmit={handleFormSubmit} 
          initialData={editingIndex !== null ? availability[editingIndex] : {}} 
        />
      )}
    </section>
  );
};

export default AvailabilitySection;
