import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginRegister.css';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', user);
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-register-container">
      <div className="left-section register"></div>
      <div className="right-section">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email" 
            onChange={handleChange} 
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />
          <select 
            name="role" 
            onChange={handleChange} 
            required
          >
            <option value="">Register as</option>
            <option value="customer">Customer</option>
            <option value="mover">Mover</option>
          </select>
          <button type="submit">Register</button>
        </form>
        <p className="link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
};

export default Register;
