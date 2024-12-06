import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Landing/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerHome from './pages/CustomerHome';
import MoversDashboard from './pages/MoversDashboard';
import { AuthProvider } from './Context/AuthContext';
import RideRequestsSection from './pages/RideRequestsSection';
import ConfirmedRide from './pages/ConfirmedRide';
import PaymentPage from './pages/PaymentPage';
import GetQuotation from './components/GetQuotation';
import ApprovedRides from './pages/ApprovedRides';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ProtectedRoute from './Context/ProtectedRoute';
import PasswordReset from './pages/PasswordReset';
import CustomerConfirmedRide from './pages/CustomerConfirmRide'
function App() {
  return (
    <AuthProvider>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<CustomerHome />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/user/approved-rides" element={<ApprovedRides />} />
          <Route path="/getquotation" element={<GetQuotation />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/user/my-reservation" element ={<CustomerConfirmedRide/>} />
          <Route path="/mover" element={
            <ProtectedRoute requiredRole="Mover">
              <MoversDashboard />
            </ProtectedRoute>
          }>
            <Route path="requested-rides" element={<RideRequestsSection />} />
            <Route path="confirmed-rides" element={<ConfirmedRide />} />
          </Route>
        </Routes>
      </GoogleOAuthProvider>
    </AuthProvider>
  );
}

export default App;
