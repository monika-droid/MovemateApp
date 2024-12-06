import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { NavLink } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'react-feather';

const Login = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginForm);
      setMessage('Login successful');
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred during login');
    }
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
        {/* Form Section */}
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
            Welcome Back!
          </h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4 position-relative">
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
                value={loginForm.email}
                onChange={handleLoginChange}
                required
                style={{
                  borderRadius: '8px',
                  fontSize: '1rem',
                  color: '#333',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #ccc',
                }}
              />
            </div>
            <div className="mb-4 position-relative">
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
                value={loginForm.password}
                onChange={handleLoginChange}
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
              Login
            </button>
          </form>
          {message && (
            <p className="text-danger text-center mt-3" style={{ fontSize: '0.9rem' }}>
              {message}
            </p>
          )}
          <div className="text-center mt-4">
            <NavLink
              to="/register"
              className="text-decoration-none"
              style={{
                color: '#00274d',
                textDecoration: 'underline',
              }}
            >
              Don't have an account? Register
            </NavLink>
          </div>
        </div>

        {/* Image Section */}
        <div
          className="col-md-6 p-0"
          style={{
            backgroundImage: 'url("../images/2.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      </div>
    </div>
  );
};

export default Login;
