import React, { useState } from 'react';
import AvailabilityForm from './AvailabilityForm';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import { Edit2, Trash2 } from 'react-feather';
import '../styles/AvailabilitySection.css';


const AvailabilitySection = ({ availability, setAvailability }) => {
  const { authToken } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const handleAddAvailability = () => {
    setEditingData(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    if (!data) {
      setShowForm(false);
      return;
    }

    try {
      if (data._id) {
        const response = await apiService.post(`/availability/${data._id}`, data);
        setAvailability((prev) =>
          prev.map((item) => (item._id === response.data._id ? response.data : item))
        );
      } else {
        const response = await apiService.post('/availability', data, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAvailability([...availability, response.data]);
      }
    } catch (error) {
      console.error('Error saving availability:', error);
    } finally {
      setShowForm(false);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = availability.find((item) => item._id === id);
    setEditingData(itemToEdit);
    setShowForm(true);
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

      {availability.length > 0 ? (
        <div className="availability-card-container">
          {availability.map((item) => (
            <div className="availability-card" key={item._id}>
              <div className="availability-card-content">
                <p><strong>Date:</strong> {item.date.split('T')[0]}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <p><strong>Province:</strong> {item.province}</p>
                <p><strong>City:</strong> {item.city}</p>
                <p><strong>Price per KM:</strong> {item.pricePerKm}</p>
              </div>
              <div className="availability-card-actions">
                <button onClick={() => handleEdit(item._id)} className="edit-btn">
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(item._id)} className="delete-btn">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-availability-warning">
          No availability found. Please post your availability.
        </div>
      )}

      <button className="add-btn" onClick={handleAddAvailability}>
        +
      </button>

      {showForm && (
        <AvailabilityForm onSubmit={handleFormSubmit} initialData={editingData} />
      )}
    </section>
  );
};

export default AvailabilitySection;
