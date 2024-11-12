// src/pages/MoversDashboard.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaglineSection from '../components/TaglineSection';
import AvailabilityForm from '../components/AvailabilityForm'; // Ensure you have this component
import '../styles/styles.css';
import apiService from '../Services/Services'; 
import VehicleRegistrationForm from '../components/VehicleRegistration';
import { useAuth } from '../Context/AuthContext';

const MoversDashboard = () => {
  const { user, authToken } = useAuth();
  const [availability, setAvailability] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [vehicleId, setVehicleId] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState();

  const handleAddAvailability = () => {
    setEditingIndex(null); // Reset editing index for new entry
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (data === null) {
      setShowForm(false);
      return; // Early return if the form is closed
    }
    if (editingIndex !== null) {
      const updatedAvailability = availability.map((item, index) =>
        index === editingIndex ? data : item
      );
      setAvailability(updatedAvailability);
    } else {
      setAvailability([...availability, data]);
    }
    setShowForm(false); // Close form after submission
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchMoverDetails = async () => {
      try {
        const response = await apiService.get(`/vehicleData/${user.email}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.data !== 0) {
          setVehicleId(response.data);
        }
      } catch (error) {
        console.error("Error fetching mover details:", error);
        setError("Failed to fetch mover details.");
      }
    };
  
    if (user) {
      fetchMoverDetails();
    }
  }, [user, authToken]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header userType="mover" />

      {/* Content section */}
      <div style={{ flex: 1 }}>
        <section className="banner-section">
          <img src="images/Slide-1.jpg" alt="Banner" className="banner-image" />
        </section>

        {/* Conditional rendering for Vehicle Registration and Availability Table */}
        {!vehicleId ? (
          <VehicleRegistrationForm moverId={user.email} />
        ) : (
          <div className="availability-table-section">
            <section className="availability-section">
              <h2>My Availability</h2>
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
                        <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                        <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>
        )}

        {/* Add Availability Form Popup */}
        {showForm && (
          <div className="form-popup">
            <AvailabilityForm 
              onSubmit={handleFormSubmit} 
              initialData={editingIndex !== null ? availability[editingIndex] : {}} // Pass existing data for editing
            />
          </div>
        )}

        <button className="add-btn" onClick={handleAddAvailability}>+</button>
      </div>

      {/* Footer always at the bottom */}
      <Footer style={{ marginTop: 'auto' }} />
    </div>
  );
};

export default MoversDashboard;
