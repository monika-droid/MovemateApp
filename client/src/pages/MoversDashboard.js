import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VehicleRegistrationForm from "../components/VehicleRegistration";
import AvailabilitySection from "../components/AvailabiltySection";
import apiService from "../Services/Services";
import { useAuth } from "../Context/AuthContext";
import "../styles/MoverDashboard.css"; // Ensure this file is updated with styles

const MoversDashboard = () => {
  const { user, authToken } = useAuth();
  const [availability, setAvailability] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchMoverData = async () => {
      if (!user) return;

      try {
        const [vehicleResponse, availabilityResponse] = await Promise.all([
          apiService.get(`/vehicleData/${user.email}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          apiService.get(`/availability/${user.email}`),
        ]);

        setVehicleId(vehicleResponse.data || null);
        setAvailability(availabilityResponse || []);
      } catch (error) {
        console.error("Error fetching mover data:", error);
        setError("Failed to fetch mover data.");
      }
    };

    fetchMoverData();
  }, [user, authToken]);

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header userType="mover" />
      <div className="mover-dashboard-content">
        {error && <div className="error-message">{error}</div>}
        <section className="banner-section">
          <img src="/images/Slide-1.jpg" alt="Banner" className="banner-image" />
        </section>
        {location.pathname === "/mover" &&
          (!vehicleId ? (
            <VehicleRegistrationForm moverId={user.email} />
          ) : (
            <AvailabilitySection
              availability={availability}
              setAvailability={setAvailability}
            />
          ))}
        <Outlet />
      </div>
      <Footer style={{ marginTop: "auto" }} />
    </div>
  );
};

export default MoversDashboard;
