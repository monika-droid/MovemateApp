import React, { useEffect, useState } from 'react';
import apiService from '../Services/Services';
import { useAuth } from '../Context/AuthContext';

const MoverAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await apiService.get(`/moverAppointments/${user.email}`);
        setAppointments(response);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, [user.email]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await apiService.put(`/rideRequest/${id}/status`, { status });
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment._id === id ? { ...appointment, status } : appointment
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p>User: {appointment.userId}</p>
            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
            <p>Time: {appointment.time}</p>
            <p>Location: {appointment.location}</p>
            <p>Status: {appointment.status}</p>
            {appointment.status === 'pending' && (
              <div>
                <button onClick={() => handleStatusUpdate(appointment._id, 'approved')}>Approve</button>
                <button onClick={() => handleStatusUpdate(appointment._id, 'rejected')}>Reject</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoverAppointments;
