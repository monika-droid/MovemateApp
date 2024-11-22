import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import apiService from "../Services/Services";
import { useAuth } from "../Context/AuthContext";
import AvailableMoversList from "./AvailableMoversList"; // Import the updated component

const SearchMovers = () => {
  const { user } = useAuth();
  const [date, setDate] = useState(null);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [movers, setMovers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false); // Controls list rendering

  const apiKey = "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==";
  const headers = { "X-CSCAPI-KEY": apiKey };

  // Fetch provinces when the component mounts
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://api.countrystatecity.in/v1/countries/CA/states",
          { headers }
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch cities when a province is selected
  useEffect(() => {
    if (province) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `https://api.countrystatecity.in/v1/countries/CA/states/${province}/cities`,
            { headers }
          );
          setCities(response.data);
        } catch (error) {
          console.error("Error fetching cities:", error);
        }
      };
      fetchCities();
    } else {
      setCities([]);
    }
  }, [province]);

  const handleSearch = async () => {
    if (!date || !city) {
      alert("Please select a date and a city.");
      return;
    }

    try {
      setIsLoading(true);
      setIsSearchTriggered(true); // Trigger the display of the list
      const formattedDate = date.toISOString().split("T")[0];
      const response = await apiService.get(
        `/searchMovers?date=${formattedDate}&location=${city}`
      );
      // Map through response to include vehicle images
      const moversWithImages = response.map((mover) => ({
        ...mover,
        image: mover.vehicle_image || "default-placeholder.png", // Use a placeholder if image is missing
      }));
      setMovers(moversWithImages);
    } catch (error) {
      console.error("Error fetching movers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestRide = async (mover) => {
    try {
      const requestData = {
        userId: user.email,
        moverId: mover.moverId,
        date: mover.date,
        time: mover.time,
        location: mover.location,
      };

      console.log("Requesting ride with data:", requestData);

      await apiService.post("/rideRequest", requestData);
      alert("Ride requested. Waiting for confirmation.");
    } catch (error) {
      console.error("Error requesting ride:", error);
      alert("Failed to request ride.");
    }
  };

  return (
    <div className="search-movers-section">
      <h2 className="search-title">Search Movers</h2>
      <div className="search-bar-container">
        <select
          className="search-input"
          value={province}
          onChange={(e) => {
            setProvince(e.target.value);
            setCity("");
          }}
          required
        >
          <option value="">Select Province</option>
          {provinces.map((prov) => (
            <option key={prov.iso2} value={prov.iso2}>
              {prov.name}
            </option>
          ))}
        </select>
        <select
          className="search-input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={!province}
          required
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <DatePicker
          className="search-input"
          selected={date}
          onChange={(newDate) => setDate(newDate)}
          placeholderText="Select a date"
        />
      </div>
      <button
        className="search-submit-btn"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search Movers"}
      </button>

      {/* Render the AvailableMoversList only if search is triggered */}
      {isSearchTriggered && (
        <AvailableMoversList movers={movers} handleRequestRide={handleRequestRide} />
      )}
    </div>
  );
};

export default SearchMovers;
