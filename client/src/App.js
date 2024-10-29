import './App.css';
import React from 'react';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import FetchData from './components/User/FetchData/FetchData'
import VehicleRegistrationForm from './components/VehicleRegistration/VehicleRegistration';
function App() {
  return (
   
     <>
     <FetchData/>
     <Register/>
     <Login/>
     <VehicleRegistrationForm />
     </>
  );
}

export default App;
