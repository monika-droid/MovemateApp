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
  const [error, setError] = useState("");
  const [autocompleteInstances, setAutocompleteInstances] = useState({});
  const [formData, setFormData] = useState({});
  const [distance, setDistance] = useState({});
  const [price, setPrice] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await apiService.get(`/userRequests/${user.email}`);
        const confirmedRides = response.filter((ride) => ride.status === "confirmed");
        setRideRequests(confirmedRides);

        if (confirmedRides.length === 0) {
          setError("No confirmed appointments found.");
        } else {
          setError("");
        }

        const initialFormData = {};
        confirmedRides.forEach((ride) => {
          initialFormData[ride._id] = { movingFrom: "", movingTo: "" };
        });
        setFormData(initialFormData);
      } catch (error) {
        console.error("Error fetching user ride requests:", error);
        setError("Failed to fetch rides. Please try again later.");
      }
    };

    fetchUserRequests();
  }, [user.email]);

  const handlePlaceChange = (field, rideId) => {
    const instance = autocompleteInstances[rideId]?.[field];
    if (instance) {
      const place = instance.getPlace();
      if (place && place.formatted_address) {
        setFormData((prev) => ({
          ...prev,
          [rideId]: {
            ...prev[rideId],
            [field]: place.formatted_address,
          },
        }));
      }
    }
  };

  const handleManualInput = (event, rideId) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [rideId]: {
        ...prev[rideId],
        [name]: value,
      },
    }));
  };

  const handleAutocompleteLoad = (autocompleteInstance, field, rideId) => {
    setAutocompleteInstances((prev) => ({
      ...prev,
      [rideId]: {
        ...prev[rideId],
        [field]: autocompleteInstance,
      },
    }));
  };

  const validateForm = (rideId) => {
    const data = formData[rideId];
    if (!data.movingFrom || !data.movingTo) {
      setError("Both 'Moving From' and 'Moving To' fields are required.");
      return false;
    }
    if (data.movingFrom === data.movingTo) {
      setError("'Moving From' and 'Moving To' cannot be the same.");
      return false;
    }
    setError("");
    return true;
  };

  const calculateDistance = async (rideId) => {
    const service = new window.google.maps.DistanceMatrixService();
    return new Promise((resolve, reject) => {
      const data = formData[rideId];
      service.getDistanceMatrix(
        {
          origins: [data.movingFrom],
          destinations: [data.movingTo],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distanceInKm = response.rows[0].elements[0].distance.value / 1000;
            setDistance((prevDistance) => ({
              ...prevDistance,
              [rideId]: distanceInKm,
            }));
            resolve(distanceInKm);
          } else {
            reject("Unable to calculate distance.");
          }
        }
      );
    });
  };

  const handleSubmit = async (e, ride) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm(ride._id)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const moverData = {
        moverId: ride.moverId,
        location: ride.location,
        date: ride.date,
        time: ride.time,
      };
      const moverDataResponse = await apiService.post(`/getMoverDetails`, moverData);
      const distanceInKm = await calculateDistance(ride._id);
      const cost = (distanceInKm * moverDataResponse.pricePerKm).toFixed(2);
      setPrice((prevPrice) => ({
        ...prevPrice,
        [ride._id]: cost,
      }));
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to calculate price. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePayNow = (ride, rideId) => {
    const paymentData = {
      pickup: formData[rideId]?.movingFrom,
      dropoff: formData[rideId]?.movingTo,
      distance: distance[rideId],
      price: price[rideId],
      ride,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    navigate("/payment");
  };

  if (loadError) {
    return <div>Failed to load Google Maps API</div>;
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <>
      <Header userType="user" />
      <div className="confirmed-rides-section">
        <h2 className="text-center mb-4" style={{ color: '#00274d', fontWeight: '700', fontSize: '1.8rem' }}>My Rides</h2>
        {error ? (
          <div className="text-center text-muted">{error}</div>
        ) : (
          <div className="confirmed-rides-container d-flex flex-wrap gap-3 justify-content-center">
            {rideRequests.map((ride) => (
              <div className="confirmed-ride-card shadow p-3 rounded" key={ride._id} style={{ backgroundColor: '#ffffff', width: '350px' }}>
                <div className="confirmed-ride-content">
                  <p><strong>Mover:</strong> {ride.moverId}</p>
                  <p><strong>Date:</strong> {new Date(ride.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {ride.time}</p>
                  <p><strong>Location:</strong> {ride.location}</p>
                  <p><strong>Status:</strong> {ride.status}</p>
                  <form className="quotation-form" onSubmit={(e) => handleSubmit(e, ride)}>
                    <div className="quotation-form-group">
                      <label htmlFor={`movingFrom-${ride._id}`}>Moving From</label>
                      <Autocomplete
                        onLoad={(instance) => handleAutocompleteLoad(instance, "from", ride._id)}
                        onPlaceChanged={() => handlePlaceChange("from", ride._id)}
                      >
                        <input
                          type="text"
                          id={`movingFrom-${ride._id}`}
                          name="movingFrom"
                          className="form-control"
                          value={formData[ride._id]?.movingFrom || ""}
                          onChange={(e) => handleManualInput(e, ride._id)}
                          placeholder="Enter your current location"
                          required
                          style={{ height: '45px', borderRadius: '5px' }}
                        />
                      </Autocomplete>
                    </div>
                    <div className="quotation-form-group mt-3">
                      <label htmlFor={`movingTo-${ride._id}`}>Moving To</label>
                      <Autocomplete
                        onLoad={(instance) => handleAutocompleteLoad(instance, "to", ride._id)}
                        onPlaceChanged={() => handlePlaceChange("to", ride._id)}
                      >
                        <input
                          type="text"
                          id={`movingTo-${ride._id}`}
                          name="movingTo"
                          className="form-control"
                          value={formData[ride._id]?.movingTo || ""}
                          onChange={(e) => handleManualInput(e, ride._id)}
                          placeholder="Enter your destination"
                          required
                          style={{ height: '45px', borderRadius: '5px' }}
                        />
                      </Autocomplete>
                    </div>
                    <button
                      type="submit"
                      className="btn mt-3"
                      disabled={isSubmitting}
                      style={{ backgroundColor: '#00274d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', width: '100%' }}
                    >
                      {isSubmitting
                        ? "Generating..."
                        : price[ride._id] && distance[ride._id]
                        ? `Pay $${price[ride._id]} for ${distance[ride._id]} km`
                        : "GET FINAL PRICE"}
                    </button>
                  </form>
                  {price[ride._id] && distance[ride._id] && (
                    <button
                      className="btn mt-3"
                      onClick={() => handlePayNow(ride, ride._id)}
                      style={{ backgroundColor: '#e63946', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', width: '100%' }}
                    >
                      Pay Now
                    </button>
                  )}
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