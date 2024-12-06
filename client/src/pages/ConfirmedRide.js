import React, { useState, useEffect } from 'react';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import '../styles/styles.css';

const ConfirmedRide = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiService.get(`/moverAppointments/${user.email}`);
        const confirmedRides = response.filter((ride) => ride.status === 'confirmed');
        setAppointments(confirmedRides);
        if (confirmedRides.length === 0) {
          setError('No confirmed appointments found.');
        } else {
          setError('');
        }

      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [user.email]);

  return (
    <div className="confirmed-rides-section">
      <h2 className="text-center mb-4" style={{ color: '#00274d', fontWeight: '700', fontSize: '1.8rem' }}>My Appointments</h2>
      {error ? (
        <div className="text-center text-muted">{error}</div>
      ) : (
        <div className="confirmed-rides-container d-flex flex-wrap gap-3 justify-content-center">
          {appointments.map((appointment) => (
            <div className="confirmed-ride-card shadow p-3 rounded" key={appointment._id} style={{ backgroundColor: '#ffffff', width: '300px' }}>
              <div className="confirmed-ride-content">
                <p><strong>User:</strong> {appointment.userId}</p>
                <p><strong>Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Location:</strong> {appointment.location}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfirmedRide;