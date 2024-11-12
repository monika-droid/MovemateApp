import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import apiService from '../Services/Services';
import Popup from '../components/Popup';  // Import Popup component

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
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Input validation functions
  const validateForm = () => {
    const newErrors = {};
    if (!validateName(registerForm.name)) newErrors.name = 'Name is required and should only contain letters';
    if (!validateEmail(registerForm.email)) newErrors.email = 'Invalid email';
    if (!validatePhone(registerForm.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (!validatePassword(registerForm.password)) newErrors.password = 'Password must be at least 6 characters';
    if (!validateConfirmPassword(registerForm.password, registerForm.confirmPassword)) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name) && name.trim() !== ''; // Only letters and spaces allowed
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^\d{10}$/.test(phone); // Example: 10 digits phone number
  const validatePassword = (password) => password.length >= 6;
  const validateConfirmPassword = (password, confirmPassword) => password === confirmPassword;

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    // Clear the error for the specific field being updated
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: ''
    }));

    setRegisterForm({
      ...registerForm,
      [name]: value
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      // Collect all error messages and show them in a popup
      const errorMessages = Object.values(errors).join('\n');
      setPopupMessage(`Please fix the following errors:\n\n${errorMessages}`);
      setShowPopup(true);
      return;
    }

    try {
      const response = await apiService.post('/register', registerForm);
      setPopupMessage(response.message || 'Registration successful');
      setShowPopup(true);

      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/');  // Redirect to login page after 2 seconds
      }, 2000); // 2 seconds delay for user to read the success message
    } catch (error) {
      setPopupMessage(error.message.message || 'An error occurred');
      setShowPopup(true);
    }
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      switch (field) {
        case 'name':
          if (!validateName(registerForm.name)) setErrors({ ...errors, name: 'Name is required and should only contain letters' });
          break;
        case 'email':
          if (!validateEmail(registerForm.email)) setErrors({ ...errors, email: 'Invalid email' });
          break;
        case 'phone':
          if (!validatePhone(registerForm.phone)) setErrors({ ...errors, phone: 'Phone number must be 10 digits' });
          break;
        case 'password':
          if (!validatePassword(registerForm.password)) setErrors({ ...errors, password: 'Password must be at least 6 characters' });
          break;
        case 'confirmPassword':
          if (!validateConfirmPassword(registerForm.password, registerForm.confirmPassword)) setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
          break;
        default:
          break;
      }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="login-register-container">
      <div className="left-section register"></div>
      <div className="right-section">
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-row">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyDown(e, 'name')}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-row">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyDown(e, 'email')}
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-row">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={registerForm.phone}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyDown(e, 'phone')}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="input-row">
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
          </div>

          <div className="input-row">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyDown(e, 'password')}
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-row">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
              onKeyDown={(e) => handleKeyDown(e, 'confirmPassword')}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit">Register</button>
        </form>

        <NavLink to="/login" className="link">
          Already Have Account? Login
        </NavLink>

        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      </div>
    </div>
  );
};

export default Register;
