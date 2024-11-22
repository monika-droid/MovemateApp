import React, { useState } from 'react';
import Popup from './Popup'; // Import a Popup component
import '../styles/styles.css'; // Import styles

const VehicleRegistrationForm = ({ moverId }) => {
  const [form, setForm] = useState({
    licence_number: '',
    mover_id: moverId || '',
    vehicle_type: '',
    space_capacity: '',
    passenger_capacity: '',
    price_per_km: '',
    availability_status: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    return Object.values(form).every((value) => value !== '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Please fill all the fields correctly.');
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }

    setMessage('Vehicle registered successfully!');
    setIsSuccess(true);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="vehicle-reg-container">
      <div className="vehicle-reg-form-wrapper">
        <h2 className="vehicle-reg-title">Register Your Vehicle</h2>
        <form className="vehicle-reg-form" onSubmit={handleSubmit}>
          <div className="vehicle-reg-row">
            <div className="vehicle-reg-group">
              <label htmlFor="licence_number">Licence Number</label>
              <input
                type="text"
                id="licence_number"
                name="licence_number"
                value={form.licence_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="vehicle-reg-group">
              <label htmlFor="mover_id">Mover ID</label>
              <input
                type="text"
                id="mover_id"
                name="mover_id"
                value={form.mover_id}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="vehicle-reg-row">
            <div className="vehicle-reg-group">
              <label htmlFor="vehicle_type">Vehicle Type</label>
              <input
                type="text"
                id="vehicle_type"
                name="vehicle_type"
                value={form.vehicle_type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="vehicle-reg-group">
              <label htmlFor="space_capacity">Space Capacity (cubic meters)</label>
              <input
                type="number"
                id="space_capacity"
                name="space_capacity"
                value={form.space_capacity}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="vehicle-reg-row">
            <div className="vehicle-reg-group">
              <label htmlFor="passenger_capacity">Passenger Capacity</label>
              <input
                type="number"
                id="passenger_capacity"
                name="passenger_capacity"
                value={form.passenger_capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="vehicle-reg-group">
              <label htmlFor="price_per_km">Price per KM</label>
              <input
                type="number"
                id="price_per_km"
                name="price_per_km"
                value={form.price_per_km}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="vehicle-reg-group">
            <label htmlFor="availability_status">Availability Status</label>
            <select
              id="availability_status"
              name="availability_status"
              value={form.availability_status}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>

          <div className="vehicle-reg-group">
            <label htmlFor="vehicle_image">Vehicle Image</label>
            <input type="file" id="vehicle_image" onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="Vehicle Preview" className="vehicle-reg-image-preview" />
            )}
          </div>

          <button type="submit" className="vehicle-reg-submit-btn">Register Vehicle</button>
        </form>
      </div>

      {showPopup && (
        <Popup
          message={message}
          onClose={() => setShowPopup(false)}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default VehicleRegistrationForm;
