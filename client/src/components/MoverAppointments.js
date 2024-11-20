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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoverAppointments;
