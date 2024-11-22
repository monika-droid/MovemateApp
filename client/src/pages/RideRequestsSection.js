import React, { useState, useEffect } from 'react';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import '../styles/styles.css';

const RideRequestsSection = () => {
  const { user, authToken } = useAuth();
  const [rideRequests, setRideRequests] = useState([]);

  useEffect(() => {
    const fetchRideRequests = async () => {
      try {
        const response = await apiService.get(`/moverRequests/${user.email}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setRideRequests(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error fetching ride requests:', error);
      }
    };

    fetchRideRequests();
  }, [user.email, authToken]);

  const handleRideRequestUpdate = async (requestId, status) => {
    try {
      await apiService.post(`/rideRequest/${requestId}/status`, { status });
      setRideRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error('Error updating ride request status:', error);
    }
  };

  return (
    <section className="ride-requests-section">
      <h2 className="ride-requests-title">Ride Requests</h2>
      <div className="ride-requests-container">
        {rideRequests.length === 0 ? (
          <p className="no-requests-message">No ride requests available</p>
        ) : (
          rideRequests.map((request) => (
            <div className="ride-request-card" key={request._id}>
              <div className="ride-request-details">
                <p><strong>User:</strong> {request.userId}</p>
                <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {request.time}</p>
                <p><strong>Status:</strong> {request.status}</p>
              </div>
              {request.status === 'pending' && (
                <>
                  <button
                    className="confirm-btn"
                    onClick={() => handleRideRequestUpdate(request._id, 'confirmed')}
                  >
                    Confirm
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleRideRequestUpdate(request._id, 'rejected')}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>

          ))
        )}
      </div>
    </section>
  );
};

export default RideRequestsSection;
