import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/styles.css';

const MoversDashboard = () => {
  const [availability, setAvailability] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    day: '',
    date: '',
    time: '',
    location: '',
  });

  const handleAddAvailability = () => {
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setAvailability([...availability, formData]);
    setFormData({ day: '', date: '', time: '', location: '' });
    setShowForm(false);
  };

  const handleEdit = (index) => {
    // Logic to edit availability
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
      
      {/* Availability Table */}
      <section className="availability-section">
        <h2>My Availability</h2>
        <table className="availability-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availability.map((item, index) => (
              <tr key={index}>
                <td>{item.day}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.location}</td>
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
      
      {/* Add Availability Form Popup */}
      {showForm && (
        <div className="form-popup">
          <form onSubmit={handleFormSubmit}>
            <h3>Add Availability</h3>
            <input
              type="text"
              name="day"
              placeholder="Day"
              value={formData.day}
              onChange={handleFormChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleFormChange}
              required
            />
            <input
              type="time"
              name="time"
              placeholder="Time"
              value={formData.time}
              onChange={handleFormChange}
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleFormChange}
              required
            />
            <button type="submit" className="submit-btn">Add</button>
            <button onClick={() => setShowForm(false)} className="cancel-btn">Cancel</button>
          </form>
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
