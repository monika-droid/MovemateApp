import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CustomerHome from './pages/CustomerHome';
import MoversDashboard from './pages/MoversDashboard';


function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerHome />} />
      <Route path="/movers" element={<MoversDashboard />} />

    </Routes>
  );
}

export default App;
