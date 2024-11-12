import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvailabilityForm from '../components/AvailabilityForm';
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
    <div>
      <Navbar userType="mover" />
      <section className="banner-section">
        <img src="images/Slide-1.jpg" alt="Banner" className="banner-image" />
      </section>
      {!vehicleId ? (
        <VehicleRegistrationForm moverId={user.email} />
      ) : (
        <div className='availability-table-and-button'>
          <section className="availability-section">
            <h2>My Availability</h2>
            <table className="availability-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Province</th>
                  <th>City</th>
                  <th>Price per KM</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {availability.map((item) => (
                  <tr key={item._id}>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.province}</td>
                    <td>{item.city}</td>
                    <td>{item.pricePerKm}</td>
                    <td>
                      <button onClick={() => handleDelete(item._id)} className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <button className="add-btn" onClick={handleAddAvailability}>+</button>
        </div>
      )}
      {showForm && (
        <div className="form-popup">
          <AvailabilityForm onSubmit={handleFormSubmit} />
        </div>
      )}
      <section className="ride-requests-section">
        <h2>Ride Requests</h2>
        {rideRequests.length > 0 ? (
          <ul>
            {rideRequests.map((request) => (
              <li key={request._id}>
                <p>User: {request.userId}</p>
                <p>Date: {new Date(request.date).toLocaleDateString()}</p>
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
    </div>
  );
};

export default MoversDashboard;
