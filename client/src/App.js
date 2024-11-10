// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import MoversDashboard from './pages/MoversDashboard';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user"
          element={
           
              <CustomerHome />          }
        />
        <Route
          path="/mover"
          element={ <MoversDashboard /> }
        />
      </Routes>
      </AuthProvider>
  );
}

export default App;
