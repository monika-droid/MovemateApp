// src/pages/MoversDashboard.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TaglineSection from '../components/TaglineSection';
import AvailabilityForm from '../components/AvailabilityForm';
import '../styles/styles.css';
import apiService from '../Services/Services';
import VehicleRegistrationForm from '../components/VehicleRegistration';
import { useAuth } from '../Context/AuthContext';

const MoversDashboard = () => {
  const { user, authToken } = useAuth();
  const [availability, setAvailability] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [vehicleId, setVehicleId] = useState(null);
  const [rideRequests, setRideRequests] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMoverData = async () => {
      if (!user) return;

      try {
        const [vehicleResponse, availabilityResponse, rideRequestsResponse] = await Promise.all([
          apiService.get(`/vehicleData/${user.email}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          apiService.get(`/availability/${user.email}`),
          apiService.get(`/moverRequests/${user.email}`)
        ]);

        setVehicleId(vehicleResponse.data || null);
        console.log("Vehicle",vehicleId)
        setAvailability(availabilityResponse || []);
        console.log("AVailll",availability)
        setRideRequests(rideRequestsResponse || []);
      } catch (error) {
        console.error("Error fetching mover data:", error);
        setError("Failed to fetch mover data.");
      }
    };

    fetchMoverData();
  }, [user, authToken]);

  const handleAddAvailability = () => setShowForm(true);

  const handleFormSubmit = async (data) => {
    console.log(data)
    if (!data) {
      setShowForm(false);
      return;
    }

    try {
      await apiService.post('/availability', data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAvailability([...availability, data]);
      console.log(availability)
    } catch (error) {
      console.error("Error adding availability:", error);
    } finally {
      setShowForm(false); // Close form after submission
    }
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header userType="mover" />

      <div style={{ flex: 1 }}>
        <section className="banner-section">
          <img src="images/Slide-1.jpg" alt="Banner" className="banner-image" />
        </section>

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
                        <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
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
      <section className="ride-requests-section">
        <h2>Ride Requests</h2>
        {rideRequests.length > 0 ? (
          <ul>
            {rideRequests.map((request) => (
              <li key={request._id}>
                <p>User: {request.userId}</p>
                <p>Date: {new Date(request.date).toLocaleDateString()}</p> {/* Format the date */}
                <p>Time: {request.time}</p>
                <p>Status: {request.status}</p>
                {request.status === 'pending' && (
                  <>
                    <button onClick={() => handleRideRequestUpdate(request._id, 'confirmed')}>Confirm</button>
                    <button onClick={() => handleRideRequestUpdate(request._id, 'rejected')}>Reject</button>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ride requests at this time.</p>
        )}
      </section>
      <section className="tagline-section">
        <p>Empowering Movers, One Job at a Time!</p>
      </section>

      <Footer style={{ marginTop: 'auto' }} />
    </div>
  );
};

export default MoversDashboard;
