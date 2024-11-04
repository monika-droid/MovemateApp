import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      res.data.role === 'customer' ? navigate('/customer-home') : navigate('/mover-home');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-register-container ">
      <div className="left-section login"></div>
      <div className="right-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="link" onClick={() => navigate('/register')}>
          Don't have an account? Register
        </p>
      </div>
    </div>
  );
};

export default Login;
