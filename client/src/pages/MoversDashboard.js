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
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    const fetchMoverDetails = async () => {
      try {
        const response = await apiService.get(`/vehicleData/${user.email}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setVehicleId(response.data || null);
      } catch (error) {
        console.error("Error fetching mover details:", error);
      }
    };
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState();

    if (user) fetchMoverDetails();
  }, [user, authToken]);

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const response = await apiService.get(`/availability/${user.moverId}`);
        setAvailability(response);
      } catch (error) {
        console.error("Error fetching availability data:", error);
      }
    };

    if (user && user.moverId) fetchAvailability();
  }, [user]);

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await apiService.get(`/moverRequests/${user.email}`);
        setRideRequests(response);
      } catch (error) {
        console.error("Error fetching ride requests:", error);
      }
    };

    if (user) fetchRideRequests();
  }, [user]);

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
      setShowForm(false);
    } catch (error) {
      console.error("Error adding availability:", error);
    }
    setShowForm(false); // Close form after submission
  };

  const handleDelete = async (id) => {
    try {
      await apiService.delete(`/availability/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAvailability(availability.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting availability:", error);
    }
  };

  const handleRideRequestUpdate = async (requestId, status) => {
    try {
      await apiService.put(`/rideRequest/${requestId}/status`, { status });
      setRideRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error updating ride request status:", error);
    }
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

        {showForm && (
          <div className="form-popup">
            <AvailabilityForm 
              onSubmit={handleFormSubmit} 
              initialData={editingIndex !== null ? availability[editingIndex] : {}} 
            />
          </div>
        )}

        <button className="add-btn" onClick={handleAddAvailability}>+</button>
      </div>

      <Footer style={{ marginTop: 'auto' }} />
    </div>
  );
};

export default MoversDashboard;
