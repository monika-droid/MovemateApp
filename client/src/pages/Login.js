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
        backgroundImage: 'url("../images/2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        className="p-4 rounded"
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h2
          className="mb-4 text-center"
          style={{
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: '1.8rem',
          }}
        >
          Welcome Back!
        </h2>
        <p
          className="text-center"
          style={{
            color: '#FFFFFF',
            marginBottom: '30px',
          }}
        >
          Please login to access your account.
        </p>
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4 position-relative">
            <Mail
              size={20}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                color: '#FFFFFF',
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
                color: '#FFFFFF', // Consistent input text color
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
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
                color: '#FFFFFF',
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
                color: '#333', // Consistent input text color
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="position-absolute end-0 top-50 translate-middle-y pe-3"
              style={{ cursor: 'pointer', color: '#FFFFFF' }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: 'rgba(0, 39, 77, 0.8)',
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
              color: '#FFFFFF',
              textDecoration: 'underline',
            }}
          >
            Don't have an account? Register
          </NavLink>
        </div>
      </div>
      <style>
        {`
        ::placeholder {
          color: rgba(255, 255, 255, 0.7); /* Light gray for better visibility */
          opacity: 1;
        }
        `}
      </style>
    </div>
  );
};

export default Login;
