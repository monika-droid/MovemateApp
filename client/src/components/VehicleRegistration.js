import React, { useState } from 'react';
import apiService from '../Services/Services';
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

const VehicleRegistrationForm = ({ moverId }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    licence_number: '',
    mover_id: moverId || '',
    vehicle_type: '',
    space_capacity: '',
    passenger_capacity: '',
    price_per_km: '',
    availability_status: '',
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

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
    if (!value) {
      error = `${name.replace('_', ' ')} is required`;
    } else if (['space_capacity', 'passenger_capacity', 'price_per_km'].includes(name) && (isNaN(value) || value <= 0)) {
      error = `${name.replace('_', ' ')} must be a positive number`;
    } else if (name === 'licence_number') {
      const regex = /^[A-Z0-9]{1,3}\s?[A-Z0-9]{1,4}$/i;
      if (!regex.test(value)) {
        error = 'Licence number must be in the format: ABC 1234';
      }
    } else if (name === 'availability_status' && !['true', 'false'].includes(value)) {
      error = 'Please select availability status';
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    return error === '';
  };

  const validateForm = () => {
    const fields = [
      'licence_number',
      'mover_id',
      'vehicle_type',
      'space_capacity',
      'passenger_capacity',
      'price_per_km',
      'availability_status',
    ];
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
      setIsSuccess(false);
      setShowPopup(true);
      return;
    }
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (image) formData.append('vehicle_image', image);
    try {
      const response = await apiService.postFormData('/vehicle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message || 'Vehicle registered successfully');
      setIsSuccess(true);
      setShowPopup(true);
      setTimeout(() => {
        navigate('/dashboard');
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to register vehicle');
      setIsSuccess(false);
      setShowPopup(true);
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f4f4f4',
        padding: '20px',
      }}
    >
      <div
        className="w-100 shadow-lg rounded p-5"
        style={{
          maxWidth: '1200px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            color: '#00274d',
            fontWeight: '700',
            fontSize: '2rem',
          }}
        >
          Register Your Vehicle
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-4 align-items-center">
            {[
              { label: 'Licence Number', name: 'licence_number' },
              { label: 'Mover ID', name: 'mover_id' },
              { label: 'Vehicle Type', name: 'vehicle_type' },
              { label: 'Space Capacity (cubic meters)', name: 'space_capacity', type: 'number' },
              { label: 'Passenger Capacity', name: 'passenger_capacity', type: 'number' },
              { label: 'Price per KM', name: 'price_per_km', type: 'number' },
            ].map(({ label, name, type = 'text' }, index) => (
              <div className="col-md-6 d-flex align-items-center" key={index}>
                <label htmlFor={name} className="form-label me-3" style={{ flex: '0 0 150px', color: '#00274d', fontSize: '1rem' }}>
                  {label}
                </label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  className="form-control py-4"
                  style={{ fontSize: '1.2rem', height: '55px', borderRadius: '10px', flex: '1' }}
                  value={form[name]}
                  onChange={handleChange}
                />
                {errors[name] && <span className="text-danger small mt-2 d-block w-100">{errors[name]}</span>}
              </div>
            ))}
            <div className="col-md-6 d-flex align-items-center">
              <label htmlFor="availability_status" className="form-label me-3" style={{ flex: '0 0 150px', color: '#00274d', fontSize: '1rem' }}>
                Availability Status
              </label>
              <select
                id="availability_status"
                name="availability_status"
                className="form-select py-4"
                style={{ fontSize: '1.2rem', height: '55px', borderRadius: '10px', flex: '1' }}
                value={form.availability_status}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-center">
              <label htmlFor="vehicle_image" className="form-label me-3" style={{ flex: '0 0 150px', color: '#00274d', fontSize: '1rem' }}>
                Vehicle Image
              </label>
              <input
                type="file"
                id="vehicle_image"
                className="form-control py-4"
                style={{ fontSize: '1.2rem', height: '55px', borderRadius: '10px', flex: '1' }}
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Vehicle Preview"
                  className="img-fluid mt-3"
                  style={{ maxHeight: '200px', borderRadius: '8px' }}
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="btn w-100 mt-4"
            style={{
              backgroundColor: '#00274d',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '1.2rem',
            }}
          >
            Register Vehicle
          </button>
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