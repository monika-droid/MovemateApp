import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AvailabilityForm from '../components/AvailabilityForm'; // Ensure you have this component
import '../styles/styles.css';
import apiService from '../Services/Services'; 
import VehicleRegistrationForm from '../components/VehicleRegistration';
import { useAuth } from '../Context/AuthContext';
const MoversDashboard = () => {
  const {user, authToken} = useAuth();
  console.log("user", user, "AuthToken", authToken)
  const [availability, setAvailability] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    day: '',
    date: '',
    time: '',
    location: '',
  });
  
  const[error, setError] = useState()
  const [vehicleId, setVehicleId] = useState(false);
  const [moverId, setMoverId] = useState()
  useEffect(() => {
    const fetchMoverDetails = async () => {
      try {
        const response = await apiService.get(`/vehicleData/${user.email}`, {
          headers: {
            Authorization: `Bearer ${authToken}`, 
          },
        });
        if(response.data === 0){
          console.log("No details Available")
        }else{
          setVehicleId(response.data)
          console.log(vehicleId)
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
  
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddAvailability = () => {
    setEditingIndex(null); // Reset editing index for new entry
    setShowForm(true);
  };

  const handleFormSubmit = (data) => {
    if (data === null) {
      setShowForm(false);
      return; // Early return if the form is closed
    }

    if (editingIndex !== null) {
      // Edit existing availability
      const updatedAvailability = availability.map((item, index) =>
        index === editingIndex ? data : item
      );
      setAvailability(updatedAvailability);
    } else {
      // Add new availability
      setAvailability([...availability, data]);
    }

    // Reset form state and close the form
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };
  

  return (
    <div>
      <Navbar userType="mover" />

      {/* Banner Section */}
      <section className="banner-section">
        <img src="images/Slide-1.jpg" alt="Banner" className="banner-image" />
      </section>
     { !vehicleId ? <VehicleRegistrationForm moverId={user.email}/> : <div className='availabliltyTableandbutton'>
      {/* Availability Table */}
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

      {/* Plus Icon Button */}
      <button className="add-btn" onClick={handleAddAvailability}>+</button>
    </div>}
   
      {/* Add Availability Form Popup */}
      {showForm && (
        <div className="form-popup">
          <AvailabilityForm 
            onSubmit={handleFormSubmit} 
            initialData={editingIndex !== null ? availability[editingIndex] : {}} // Pass existing data for editing
          />
        </div>
      )}

      {/* Tagline */}
      <section className="tagline-section">
        <p>Empowering Movers, One Job at a Time!</p>
      </section>

      {/* Footer */}
      {/* <Footer userType="mover" /> */}
    </div>
  );
};

export default MoversDashboard;
