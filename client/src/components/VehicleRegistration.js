import React, { useState } from 'react';
import apiService from '../Services/Services'; 
import { useNavigate } from 'react-router-dom';

const VehicleRegistrationForm = ({moverId}) => {
  console.log(moverId)
  const navigate = useNavigate();
  const [form, setForm] = useState({
    licence_number: '',
    mover_id: moverId? moverId:'',
    vehicle_type: '',
    space_capacity: '',
    passenger_capacity: '',
    price_per_km: '',
    availability_status: '', // Default value
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    validateField(name, value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateField = (name, value) => {
    let error = '';

    if (!value) error = `${name.replace('_', ' ')} is required`;
    else if ((name === 'space_capacity' || name === 'passenger_capacity' || name === 'price_per_km') && isNaN(value)) {
      error = `${name.replace('_', ' ')} must be a number`;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error === '';
  };

  const validateForm = () => {
    const fields = ['licence_number', 'mover_id', 'vehicle_type', 'space_capacity', 'passenger_capacity', 'price_per_km', 'availability_status'];
    let isValid = true;
    fields.forEach((field) => {
      if (!validateField(field, form[field])) isValid = false;
    });
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Please fill out all fields correctly.');
      return;
    }
  
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (image) formData.append('vehicle_image', image);
  
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
  
    try {      
      const response = await apiService.postFormData('/vehicle', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message || 'Vehicle registered successfully');
      navigate('/mover');

    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to register vehicle');
    }
  };

  return (
    <div className="vehicle-registration-form">
      <h2>Register a New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Licence Number</label>
            <input
              type="text"
              name="licence_number"
              value={form.licence_number}
              onChange={handleChange}
              required
            />
            {errors.licence_number && <span className="error">{errors.licence_number}</span>}
          </div>

          <div className="form-group">
            <label>Mover ID</label>
            <input
              type="text"
              name="mover_id"
              value={form.mover_id}
              onChange={handleChange}
              required
            />
            {errors.mover_id && <span className="error">{errors.mover_id}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Vehicle Type</label>
            <input
              type="text"
              name="vehicle_type"
              value={form.vehicle_type}
              onChange={handleChange}
              required
            />
            {errors.vehicle_type && <span className="error">{errors.vehicle_type}</span>}
          </div>

          <div className="form-group">
            <label>Space Capacity (cubic meters)</label>
            <input
              type="number"
              name="space_capacity"
              value={form.space_capacity}
              onChange={handleChange}
              required
            />
            {errors.space_capacity && <span className="error">{errors.space_capacity}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Passenger Capacity</label>
            <input
              type="number"
              name="passenger_capacity"
              value={form.passenger_capacity}
              onChange={handleChange}
              required
            />
            {errors.passenger_capacity && <span className="error">{errors.passenger_capacity}</span>}
          </div>

          <div className="form-group">
            <label>Price per KM</label>
            <input
              type="number"
              name="price_per_km"
              value={form.price_per_km}
              onChange={handleChange}
              required
            />
            {errors.price_per_km && <span className="error">{errors.price_per_km}</span>}
          </div>
        </div>

        <div className="form-group">
          <label>Availability Status</label>
          <select name="availability_status" value={form.availability_status} onChange={handleChange} required>
            <option value="val">select</option>
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        <div className="form-group">
          <label>Vehicle Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
          {imagePreview && <img src={imagePreview} alt="Vehicle Preview" className="image-preview" />}
        </div>

        <button type="submit">Register Vehicle</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default VehicleRegistrationForm;
