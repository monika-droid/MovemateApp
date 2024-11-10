import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import apiService from '../Services/Services';
const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',  
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  // Input validation functions
  const validateForm = () => {
    const newErrors = {};
    if (!validateName(registerForm.name)) newErrors.name = true;
    if (!validateEmail(registerForm.email)) newErrors.email = true;
    if (!validatePhone(registerForm.phone)) newErrors.phone = true;
    if (!validatePassword(registerForm.password)) newErrors.password = true;
    if (!validateConfirmPassword(registerForm.password, registerForm.confirmPassword)) newErrors.confirmPassword = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateName = (name) => name.trim() !== '';
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone); // Example: 10 digits phone number
  const validatePassword = (password) => password.length >= 6;
  const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    // Trim the value to remove leading/trailing whitespace
    const trimmedValue = value.trim();

    setRegisterForm({
      ...registerForm,
      [name]: trimmedValue
    });

    // Check overall form validity on every change
    validateForm();
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage('Please fill out all fields correctly');
      return;
    }
    try {
      const response = await apiService.post('/register', registerForm);
      setPopupMessage(response.message || 'Registration successful');
      setShowPopup(true);

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/login');  // Redirect to login page after 2 seconds
      }, 2000); // 2 seconds delay for user to read the success message
    } catch (error) {
      setMessage(error.message || 'An error occurred');
    }
  };

  return (
    <div className="login-register-container">
      <div className="left-section register"></div>
      <div className="right-section">
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={registerForm.name}
            onChange={handleRegisterChange}
          />
          {errors.name && <span className="error">Name is required</span>}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleRegisterChange}
          />
          {errors.email && <span className="error">Invalid email</span>}
          
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={registerForm.phone}
            onChange={handleRegisterChange}
          />
          {errors.phone && <span className="error">Invalid phone number</span>}
          
          <select
            name="userType"
            value={registerForm.userType}
            onChange={handleRegisterChange}
            required
          >
            <option value="">Select User Type</option>
            <option value="User">User</option>
            <option value="Mover">Mover</option>
          </select>
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleRegisterChange}
          />
          {errors.password && <span className="error">Password must be at least 6 characters</span>}
          
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={registerForm.confirmPassword}
            onChange={handleRegisterChange}
          />
          {errors.confirmPassword && <span className="error">Passwords do not match</span>}
          
          <button type="submit">
            Register
          </button>
        </form>
        
        <NavLink to="/" className="link">
          Already Have Account? Login
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
