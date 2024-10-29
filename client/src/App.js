import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerHome from './pages/CustomerHome';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import Register from './pages/Register';
import MoversDashboard from './pages/MoversDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerHome />} />
      <Route path="/movers" element={<MoversDashboard />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
