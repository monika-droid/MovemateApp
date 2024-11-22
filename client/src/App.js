// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Landing/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import MoversDashboard from './pages/MoversDashboard';
import { AuthProvider } from './Context/AuthContext';
import  RideRequestsSection  from './pages/RideRequestsSection';
import ConfirmedRide from './pages/ConfirmedRide';
import GetQuotation from './components/GetQuotation';
function App() {
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<CustomerHome />}/>
        <Route path="/getquotation" element={<GetQuotation />} />
        <Route path="/mover" element={<MoversDashboard />}>
        <Route path="requested-rides" element={<RideRequestsSection/>} />
        <Route path="confirmed-rides" element={<ConfirmedRide/>} />

        </Route>
      </Routes>
      </AuthProvider>
  );
}

export default App;
