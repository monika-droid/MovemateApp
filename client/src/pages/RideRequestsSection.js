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
      <h2 className="text-center mb-4" style={{ color: '#00274d', fontWeight: '700', fontSize: '1.8rem' }}>Ride Requests</h2>
      <div className="ride-requests-container d-flex flex-wrap gap-3 justify-content-center">
        {rideRequests.length === 0 ? (
          <p className="text-muted text-center">No ride requests available</p>
        ) : (
          rideRequests.map((request) => (
            <div className="ride-request-card shadow p-3 rounded" key={request._id} style={{ backgroundColor: '#ffffff', width: '300px' }}>
              <div className="ride-request-details">
                <p><strong>User:</strong> {request.userId}</p>
                <p><strong>Date:</strong> {new Date(request.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {request.time}</p>
                <p><strong>Status:</strong> {request.status}</p>
              </div>
              {request.status === 'pending' && (
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn"
                    style={{ backgroundColor: '#00274d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px' }}
                    onClick={() => handleRideRequestUpdate(request._id, 'confirmed')}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn"
                    style={{ backgroundColor: '#e63946', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px' }}
                    onClick={() => handleRideRequestUpdate(request._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RideRequestsSection;
