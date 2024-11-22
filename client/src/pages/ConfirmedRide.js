import React, { useState, useEffect } from 'react';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';
import '../styles/styles.css';

const ConfirmedRide = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiService.get(`/moverAppointments/${user.email}`);
        const confirmedRides = response.filter((ride) => ride.status === 'confirmed');
        setAppointments(confirmedRides);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, [user.email]);

  return (
    <div className="confirmed-rides-section">
      <h2 className="confirmed-rides-title">My Appointments</h2>
      <div className="confirmed-rides-container">
        {appointments.map((appointment) => (
          <div className="confirmed-ride-card" key={appointment._id}>
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
    </div>
  );
};

export default ConfirmedRide;
