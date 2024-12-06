import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';
import { X } from 'react-feather';

const AvailabilityForm = ({ onSubmit, initialData }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    province: '',
    city: '',
    pricePerKm: '',
  });
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const apiKey = 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==';
  const headers = { 'X-CSCAPI-KEY': apiKey };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          'https://api.countrystatecity.in/v1/countries/CA/states',
          { headers }
        );
        setProvinces(response.data);
      } catch (error) {}
    };
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/CA/states/${selectedProvince}/cities`,
            { headers }
          );
          setCities(response.data);
        } catch (error) {}
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSelectedProvince(initialData.province);
      setSelectedCity(initialData.city);
      const dateObject = new Date(initialData.date);
      if (!isNaN(dateObject.getTime())) {
        setSelectedDate(dateObject);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && formData.time && formData.province && formData.city && formData.pricePerKm) {
      onSubmit({ ...formData, date: selectedDate.toISOString().split('T')[0], moverId: user.email });
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div
      className="popup-overlay d-flex justify-content-center align-items-center"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: '100vh', width: '100vw' }}
    >
      <div
        className="popup-content p-4 rounded shadow position-relative"
        style={{ backgroundColor: '#FFFFFF', width: '100%', maxWidth: '500px' }}
      >
        <button
          type="button"
          className="btn-close position-absolute"
          style={{ top: '10px', right: '10px', background: 'none', border: 'none' }}
          onClick={() => onSubmit(null)}
        >
          <X size={24} color="#00274d" />
        </button>
        <h3
          className="text-center mb-4"
          style={{ color: '#00274d', fontWeight: '700', fontSize: '1.5rem' }}
        >
          {formData._id ? 'Edit Availability' : 'Add Availability'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="province" className="form-label me-3" style={{ color: '#00274d', flex: '0 0 120px' }}>
              Province
            </label>
            <select
              id="province"
              className="form-select py-2"
              style={{ borderRadius: '8px', fontSize: '1rem', color: '#333', flex: '1' }}
              value={selectedProvince}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
                setFormData({ ...formData, province: e.target.value });
                setSelectedCity('');
              }}
              required
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.iso2} value={province.iso2}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="city" className="form-label me-3" style={{ color: '#00274d', flex: '0 0 120px' }}>
              City
            </label>
            <select
              id="city"
              className="form-select py-2"
              style={{ borderRadius: '8px', fontSize: '1rem', color: '#333', flex: '1' }}
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setFormData({ ...formData, city: e.target.value });
              }}
              disabled={!selectedProvince}
              required
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="date" className="form-label me-3" style={{ color: '#00274d', flex: '0 0 120px' }}>
              Date
            </label>
            <DatePicker
              id="date"
              className="form-control py-2"
              style={{ borderRadius: '8px', fontSize: '1rem', flex: '1' }}
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setFormData({ ...formData, date: date ? date.toISOString().split('T')[0] : '' });
              }}
              minDate={new Date()}
              placeholderText="Select a date"
              required
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="time" className="form-label me-3" style={{ color: '#00274d', flex: '0 0 120px' }}>
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              className="form-control py-2"
              style={{ borderRadius: '8px', fontSize: '1rem', color: '#333', flex: '1' }}
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="pricePerKm" className="form-label me-3" style={{ color: '#00274d', flex: '0 0 120px' }}>
              Price per KM
            </label>
            <input
              type="number"
              id="pricePerKm"
              name="pricePerKm"
              className="form-control py-2"
              style={{ borderRadius: '8px', fontSize: '1rem', color: '#333', flex: '1' }}
              placeholder="Enter price per KM"
              value={formData.pricePerKm}
              onChange={handleChange}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn w-100"
              style={{ backgroundColor: '#00274d', color: 'white', padding: '10px', borderRadius: '8px', fontWeight: '600' }}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityForm;