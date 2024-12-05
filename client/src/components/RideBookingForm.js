import React, { useState, useEffect } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import apiService from '../Services/Services';
// import '../styles/RideBookingForm.css'; // Ensure this file exists and is styled appropriately

const GOOGLE_MAPS_API_KEY = 'AIzaSyDNfZdDVW-G98BjDuOmOlEWmL74_J2eD6g';
const libraries = ['places'];

const RideBookingForm = ({ moverId, pricePerKm, onConfirm }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupAutocomplete, setPickupAutocomplete] = useState(null);
  const [dropoffAutocomplete, setDropoffAutocomplete] = useState(null);
  const [distance, setDistance] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(null);

  const handlePlaceChange = (type) => {
    const place =
      type === 'pickup' ? pickupAutocomplete.getPlace() : dropoffAutocomplete.getPlace();
    if (place && place.formatted_address) {
      type === 'pickup'
        ? setPickup(place.formatted_address)
        : setDropoff(place.formatted_address);
    }
  };

  const calculateDistanceAndCost = async () => {
    if (!pickup || !dropoff) {
      alert('Please select both pickup and drop-off locations.');
      return;
    }

    try {
      const response = await apiService.post('/calculate-distance', {
        pickup,
        dropoff,
      });
      const calculatedDistance = response.distance; // Distance in kilometers
      const cost = (calculatedDistance * pricePerKm).toFixed(2);

      setDistance(calculatedDistance);
      setEstimatedCost(cost);
    } catch (error) {
      console.error('Error calculating distance:', error);
      alert('Failed to calculate distance. Please try again.');
    }
  };

  const handleConfirm = () => {
    if (!distance || !estimatedCost) {
      alert('Please calculate the distance and cost first.');
      return;
    }

    onConfirm({ pickup, dropoff, distance, estimatedCost });
  };

  if (loadError) return <p>Error loading Google Maps</p>;
  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div className="ride-booking-form">
      <h2>Book a Ride</h2>
      <div className="form-group">
        <label>Pickup Location</label>
        <Autocomplete
          onLoad={(autocomplete) => setPickupAutocomplete(autocomplete)}
          onPlaceChanged={() => handlePlaceChange('pickup')}
        >
          <input
            type="text"
            placeholder="Enter pickup location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </Autocomplete>
      </div>

      <div className="form-group">
        <label>Drop-off Location</label>
        <Autocomplete
          onLoad={(autocomplete) => setDropoffAutocomplete(autocomplete)}
          onPlaceChanged={() => handlePlaceChange('dropoff')}
        >
          <input
            type="text"
            placeholder="Enter drop-off location"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
        </Autocomplete>
      </div>

      <div className="form-group">
        <button onClick={calculateDistanceAndCost} className="calculate-btn">
          Calculate Distance & Cost
        </button>
      </div>

      {distance && estimatedCost && (
        <div className="results">
          <p>Distance: {distance.toFixed(2)} km</p>
          <p>Estimated Cost: ${estimatedCost}</p>
        </div>
      )}

      <div className="form-group">
        <button onClick={handleConfirm} className="confirm-btn">
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default RideBookingForm;
