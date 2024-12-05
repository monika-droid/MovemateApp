import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import apiService from "../Services/Services";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import Header from "../components/Header";
import "../styles/ApprovedRides.css";

const libraries = ["places"];

const ApprovedRides = () => {
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const [rideRequests, setRideRequests] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState({});
  const autocompleteRefs = useRef({});

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const response = await apiService.get(`/userRequests/${user.email}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setRideRequests(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching user ride requests:", error);
      }
    };

    fetchUserRequests();
  }, [user.email, authToken]);

  const handlePlaceChanged = (rideId, field) => {
    const place = autocompleteRefs.current[rideId]?.[field]?.getPlace();
    if (place && place.formatted_address) {
      setSelectedLocations((prev) => ({
        ...prev,
        [rideId]: {
          ...prev[rideId],
          [field]: place.formatted_address,
        },
      }));
    }
  };

  const calculateDistance = async (rideId) => {
    const { pickup, dropoff } = selectedLocations[rideId] || {};
    if (!pickup || !dropoff) {
      alert("Please select both pickup and dropoff locations.");
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [pickup],
        destinations: [dropoff],
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK" && response.rows[0].elements[0].status === "OK") {
          const distanceInKm = response.rows[0].elements[0].distance.value / 1000;
          setSelectedLocations((prev) => ({
            ...prev,
            [rideId]: {
              ...prev[rideId],
              distance: distanceInKm,
            },
          }));
        } else {
          console.error("Error calculating distance:", status);
          alert("Error calculating distance. Please try again.");
        }
      }
    );
  };

  const handlePayNow = (rideId) => {
    const ride = rideRequests.find((ride) => ride._id === rideId);
    const selectedLocation = selectedLocations[rideId];

    if (!ride || !selectedLocation || !selectedLocation.pickup || !selectedLocation.dropoff) {
      alert("Please select valid pickup and dropoff locations.");
      return;
    }

    const paymentData = {
      pickup: selectedLocation.pickup,
      dropoff: selectedLocation.dropoff,
      distance: selectedLocation.distance,
      ride,
    };

    localStorage.setItem("paymentData", JSON.stringify(paymentData));
    navigate("/payment");
  };

  return (
    <div>
      <Header userType="user" />
      <div className="approved-rides-section">
        <h2 className="approved-rides-title">My Approved Rides</h2>
        {rideRequests.length === 0 ? (
          <p className="no-requests-message">No ride requests available</p>
        ) : (
          <LoadScript googleMapsApiKey="AIzaSyDNfZdDVW-G98BjDuOmOlEWmL74_J2eD6g" libraries={libraries}>
            <table className="approved-rides-table">
              <thead>
                <tr>
                  <th>Mover</th>
                  <th>Date</th>
                  <th>Pickup</th>
                  <th>Dropoff</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rideRequests.map((ride) => (
                  <tr key={ride._id}>
                    <td>{ride.moverId}</td>
                    <td>{new Date(ride.date).toLocaleDateString()}</td>
                    <td>
                      <Autocomplete
                        onLoad={(ref) =>
                          (autocompleteRefs.current[ride._id] = {
                            ...autocompleteRefs.current[ride._id],
                            pickup: ref,
                          })
                        }
                        onPlaceChanged={() => handlePlaceChanged(ride._id, "pickup")}
                      >
                        <input type="text" placeholder="Enter pickup location" className="location-input" />
                      </Autocomplete>
                    </td>
                    <td>
                      <Autocomplete
                        onLoad={(ref) =>
                          (autocompleteRefs.current[ride._id] = {
                            ...autocompleteRefs.current[ride._id],
                            dropoff: ref,
                          })
                        }
                        onPlaceChanged={() => handlePlaceChanged(ride._id, "dropoff")}
                      >
                        <input type="text" placeholder="Enter dropoff location" className="location-input" />
                      </Autocomplete>
                    </td>
                    <td>
                      <button className="calculate-distance-btn" onClick={() => calculateDistance(ride._id)}>
                        Calculate Distance
                      </button>
                      <button className="pay-now-btn" onClick={() => handlePayNow(ride._id)}>
                        Pay Now
                      </button>
                      {selectedLocations[ride._id]?.distance && (
                        <p>Distance: {selectedLocations[ride._id].distance.toFixed(2)} km</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </LoadScript>
        )}
      </div>
    </div>
  );
};

export default ApprovedRides;
