import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { User, Mail, Phone, Lock, Key, Eye, EyeOff } from 'react-feather';
import apiService from '../Services/Services';
import Popup from '../components/Popup';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!/^[a-zA-Z\s]+$/.test(registerForm.name)) newErrors.name = 'Name is required and should only contain letters';
    if (!/\S+@\S+\.\S+/.test(registerForm.email)) newErrors.email = 'Invalid email';
    if (!/^\d{10}$/.test(registerForm.phone)) newErrors.phone = 'Phone number must be 10 digits';
    if (registerForm.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));

    setRegisterForm({
      ...registerForm,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      const errorMessages = Object.values(errors).join('\n');
      setPopupMessage(`Please fix the following errors:\n\n${errorMessages}`);
      setShowPopup(true);
      return;
    }

    try {
      const response = await apiService.post('/register', registerForm);
      setPopupMessage(response.message || 'Registration successful');
      setShowPopup(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setPopupMessage(error.response?.data?.message || 'An error occurred');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div
      className="vh-100 d-flex align-items-center justify-content-center"
      style={{
        fontFamily: "'Poppins', sans-serif",
        padding: '20px',
      }}
    >
      <div
        className="row shadow-lg rounded overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          className="col-md-6 p-5 d-flex flex-column justify-content-center"
          style={{
            padding: '40px',
          }}
        >
          <h2
            className="mb-4 text-center"
            style={{
              color: '#00274d',
              fontWeight: '700',
              fontSize: '2rem',
            }}
          >
            Create an Account
          </h2>
          <form onSubmit={handleRegisterSubmit}>
            <div className="mb-3 position-relative">
              <User
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  color: '#00274d',
                }}
              />
              <input
                type="text"
                name="name"
                className="form-control py-2 ps-5"
                placeholder="Name"
                value={registerForm.name}
                onChange={handleRegisterChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              />
              {errors.name && <span className="text-danger small">{errors.name}</span>}
            </div>
            <div className="mb-3 position-relative">
              <Mail
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  color: '#00274d',
                }}
              />
              <input
                type="email"
                name="email"
                className="form-control py-2 ps-5"
                placeholder="Email"
                value={registerForm.email}
                onChange={handleRegisterChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              />
              {errors.email && <span className="text-danger small">{errors.email}</span>}
            </div>
            <div className="mb-3 position-relative">
              <Phone
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  color: '#00274d',
                }}
              />
              <input
                type="text"
                name="phone"
                className="form-control py-2 ps-5"
                placeholder="Phone Number"
                value={registerForm.phone}
                onChange={handleRegisterChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              />
              {errors.phone && <span className="text-danger small">{errors.phone}</span>}
            </div>
            <div className="mb-3">
              <select
                name="userType"
                className="form-control py-2"
                value={registerForm.userType}
                onChange={handleRegisterChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              >
                <option value="">Select User Type</option>
                <option value="User">User</option>
                <option value="Mover">Mover</option>
              </select>
            </div>
            <div className="mb-3 position-relative">
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  color: '#00274d',
                }}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-control py-2 ps-5"
                placeholder="Password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute end-0 top-50 translate-middle-y pe-3"
                style={{ cursor: 'pointer', color: '#00274d' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {errors.password && <span className="text-danger small">{errors.password}</span>}
            </div>
            <div className="mb-3 position-relative">
              <Key
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  color: '#00274d',
                }}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-control py-2 ps-5"
                placeholder="Confirm Password"
                value={registerForm.confirmPassword}
                onChange={handleRegisterChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="position-absolute end-0 top-50 translate-middle-y pe-3"
                style={{ cursor: 'pointer', color: '#00274d' }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
              {errors.confirmPassword && <span className="text-danger small">{errors.confirmPassword}</span>}
            </div>
            <button
              type="submit"
              className="btn w-100"
              style={{
                backgroundColor: '#00274d',
                color: 'white',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '1rem',
              }}
            >
              Register
            </button>
          </form>
          <div className="text-center mt-3">
            <NavLink
              to="/login"
              className="text-decoration-none"
              style={{
                color: '#00274d',
                textDecoration: 'underline',
              }}
            >
              Already have an account? Login
            </NavLink>
          </div>
        </div>

        <div
          className="col-md-6 p-0"
          style={{
            backgroundImage: 'url("../images/3.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
      {showPopup && (
        <Popup
          message={popupMessage}
          onClose={closePopup}
          isSuccess={popupMessage.toLowerCase().includes('successful')}
        />
      )}
    </div>
  );
};

export default Register;
