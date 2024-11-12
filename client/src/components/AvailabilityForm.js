import React, { useState, useEffect } from 'react';
import '../styles/styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';

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
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
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
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
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
      } else {
        console.error('Invalid date format:', initialData.date);
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
      console.log({ ...formData, date: selectedDate.toISOString().split('T')[0], moverId: user.email })
    } else {
      alert('Please fill out all fields.');
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>Add Availability</h3>
        <form onSubmit={handleSubmit}>
          <select
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
          <select
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
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setFormData({ ...formData, date: date ? date.toISOString().split('T')[0] : '' });
            }}
            placeholderText="Select a date"
            required
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="pricePerKm"
            placeholder="Price per KM"
            value={formData.pricePerKm}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
          <button type="button" onClick={() => onSubmit(null)}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default AvailabilityForm;
