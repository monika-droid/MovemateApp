import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import { NavLink } from 'react-router-dom';

const Login = () => {
  const { login } = useAuth();
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
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
    <div className="login-register-container">
      <div className="left-section login"></div>
      <div className="right-section">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleLoginChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleLoginChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
      <NavLink to="/register">Don't have an account? Register</NavLink>
      </div>
    </div>
  );
};

export default Login;
