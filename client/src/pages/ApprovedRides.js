import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiService from "../Services/Services";
import Header from "../components/Header";
import "../styles/ApprovedRides.css";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "AIzaSyDNfZdDVW-G98BjDuOmOlEWmL74_J2eD6g";
const libraries = ["places"];

const ApprovedRides = () => {
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const [rideRequests, setRideRequests] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const [error, setError] = useState("");
  const [autocompleteFrom, setAutocompleteFrom] = useState(null);
  const [autocompleteTo, setAutocompleteTo] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [price, setPrice] = useState();
  const [formData, setFormData] = useState({
    movingFrom: "",
    movingTo: "",
  });

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (window.google) {
      console.log("Google Maps is ready!");
    }

    const fetchUserRequests = async () => {
      try {
        const response = await apiService.get(`/userRequests/${user.email}`);
        const confirmedRides = response.filter((ride) => ride.status === "confirmed");
        if (confirmedRides.length === 0) {
          setError("No confirmed appointments found.");
        } else {
          setError("");
        }
        setRideRequests(confirmedRides);
      } catch (error) {
        console.error("Error fetching user ride requests:", error);
      }
    };

    fetchUserRequests();
  }, [user.email, authToken]);

  const handlePlaceChange = (field) => {
    const autocomplete = field === "from" ? autocompleteFrom : autocompleteTo;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        setFormData({
          ...formData,
          [field === "from" ? "movingFrom" : "movingTo"]: place.formatted_address,
        });
      }
    }
  };

  const handleManualInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (formData.movingFrom === formData.movingTo) {
      setError('"Moving From" and "Moving To" cannot be the same.');
      return false;
    }
    return true;
  };

  const calculateDistance = async () => {
    const service = new window.google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      if (formData.movingFrom && formData.movingTo) {
        service.getDistanceMatrix(
          {
            origins: [formData.movingFrom],
            destinations: [formData.movingTo],
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK" && response.rows[0].elements[0].status === "OK") {
              const distanceInKm = response.rows[0].elements[0].distance.value / 1000;
              setDistance(distanceInKm);
              resolve(distanceInKm);
            } else {
              reject("Unable to calculate distance.");
            }
          }
        );
      } else {
        reject("Both locations are required.");
      }
    });
  };

  const handlePayNow = (ride, movingFrom, movingTo, price, distance) => {
    const paymentData = {
      pickup: movingFrom,
      dropoff: movingTo,
      distance: distance,
      price: price,
      ride,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    navigate("/payment");
  };

  const handleSubmit = async (e, moverId, location, date, time) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const moverData = {
        moverId,
        location,
        date,
        time,
      };
      const moverDataresponse = await apiService.post(`/getMoverDetails`, moverData);
      const distanceInKm = await calculateDistance();
      const cost = (distanceInKm * moverDataresponse.pricePerKm).toFixed(2);
      setPrice(cost);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) {
    return <div>Failed to load Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <div>
        <Header userType="user" />
      </div>
      <div className="confirmed-rides-section">
        <h2 className="confirmed-rides-title">My Rides</h2>
        {error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="confirmed-rides-container">
            {rideRequests.map((ride) => (
              <div className="confirmed-ride-card" key={ride._id}>
                <div className="confirmed-ride-content">
                  <p>
                    <strong>Mover :</strong> {ride.moverId}
                  </p>
                  <p>
                    <strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Time:</strong> {ride.time}
                  </p>
                  <p>
                    <strong>Location:</strong> {ride.location}
                  </p>
                  <p>
                    <strong>Status:</strong> {ride.status}
                  </p>
                  <form
                    className="quotation-form"
                    onSubmit={(e) => handleSubmit(e, ride.moverId, ride.location, ride.date, ride.time)}
                  >
                    <div className="quotation-form-group">
                      <label htmlFor="movingFrom">Moving From</label>
                      <Autocomplete
                        onLoad={(autocomplete) => setAutocompleteFrom(autocomplete)}
                        onPlaceChanged={() => handlePlaceChange("from")}
                      >
                        <input
                          type="text"
                          id="movingFrom"
                          name="movingFrom"
                          className="quotation-input"
                          value={formData.movingFrom}
                          onChange={handleManualInput}
                          placeholder="Enter your current location"
                          required
                        />
                      </Autocomplete>
                    </div>
                    <div className="quotation-form-group">
                      <label htmlFor="movingTo">Moving To</label>
                      <Autocomplete
                        onLoad={(autocomplete) => setAutocompleteTo(autocomplete)}
                        onPlaceChanged={() => handlePlaceChange("to")}
                      >
                        <input
                          type="text"
                          id="movingTo"
                          name="movingTo"
                          className="quotation-input"
                          value={formData.movingTo}
                          onChange={handleManualInput}
                          placeholder="Enter your destination"
                          required
                        />
                      </Autocomplete>
                    </div>
                    <button type="submit" className="quotation-submit" disabled={isSubmitting}>
                      {isSubmitting
                        ? "Generating..."
                        : price && distance
                        ? `Pay $${price} for ${distance} km`
                        : "GET FINAL PRICE"}
                    </button>
                    {price && distance && (
                      <button
                        className="pay-now-btn"
                        onClick={() =>
                          handlePayNow(ride, formData.movingFrom, formData.movingTo, price, distance)
                        }
                      >
                        Confirm Payment
                      </button>
                    )}
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ApprovedRides;
