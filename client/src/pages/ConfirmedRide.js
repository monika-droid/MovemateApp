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
          const confirmedRides = response.filter(ride => ride.status === "confirmed");
          setAppointments(confirmedRides);
        } catch (error) {
          console.error("Error fetching appointments:", error);
        }
      };
      fetchAppointments();
    }, [user.email]);
  
    return (
      <div>
        <h2>My Appointments</h2>
         <ul className='Confirmedbookings'>
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

export default ConfirmedRide;
