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
      <h2 className="text-center mb-4" style={{ color: '#00274d', fontWeight: '700', fontSize: '1.8rem' }}>My Availability</h2>

      {availability.length > 0 ? (
        <div className="availability-card-container d-flex flex-wrap gap-3">
          {availability.map((item) => (
            <div className="availability-card shadow p-3 rounded" key={item._id} style={{ backgroundColor: '#ffffff', flex: '0 0 30%' }}>
              <div className="availability-card-content">
                <p><strong>Date:</strong> {item.date.split('T')[0]}</p>
                <p><strong>Time:</strong> {item.time}</p>
                <p><strong>Province:</strong> {item.province}</p>
                <p><strong>City:</strong> {item.city}</p>
                <p><strong>Price per KM:</strong> {item.pricePerKm}</p>
              </div>
              <div className="availability-card-actions d-flex justify-content-between mt-3">
                <button onClick={() => handleEdit(item._id)} className="btn" style={{ backgroundColor: '#00274d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>
                  <Edit2 size={18} /> Edit
                </button>
                <button onClick={() => handleDelete(item._id)} className="btn" style={{ backgroundColor: '#e63946', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px' }}>
                  <Trash2 size={18} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-availability-warning text-center mt-4">
          <p className="text-muted">No availability found. Please post your availability.</p>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn" style={{ fontSize: '1.2rem', padding: '10px 20px', backgroundColor: '#00274d', color: 'white', border: 'none', borderRadius: '8px' }} onClick={handleAddAvailability}>
          + Add Availability
        </button>
      </div>

      {showForm && (
        <AvailabilityForm onSubmit={handleFormSubmit} initialData={editingData} />
      )}
    </section>
  );
};

export default AvailabilitySection;


