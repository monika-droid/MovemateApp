import React, { useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "../styles/styles.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyDNfZdDVW-G98BjDuOmOlEWmL74_J2eD6g";
const libraries = ["places"];

const GetQuotation = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    movingFrom: "",
    movingTo: "",
    movingDate: "",
    additionalDetails: "",
  });

  const [autocompleteFrom, setAutocompleteFrom] = useState(null);
  const [autocompleteTo, setAutocompleteTo] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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
    } else {
      console.error(`Autocomplete is not initialized for ${field}`);
    }
  };

  const handleManualInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (formData.movingFrom === formData.movingTo) {
      newErrors.movingLocations = '"Moving From" and "Moving To" cannot be the same.';
    }

    if (new Date(formData.movingDate) < today) {
      newErrors.movingDate = "Moving date cannot be in the past.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const generatePDF = (data) => {
    const { name, email, phone, movingFrom, movingTo, movingDate, distance, cost } = data;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Quotation Details", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 20, 30);
    doc.text(`Email: ${email}`, 20, 40);
    doc.text(`Phone: ${phone}`, 20, 50);
    doc.text(`Moving From: ${movingFrom}`, 20, 60);
    doc.text(`Moving To: ${movingTo}`, 20, 70);
    doc.text(`Distance: ${distance.toFixed(2)} km`, 20, 80);
    doc.text(`Estimated Cost: $${cost}`, 20, 90);
    doc.text(`Moving Date: ${movingDate}`, 20, 100);

    doc.save(`Quotation-${name}.pdf`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const distanceInKm = await calculateDistance();
      const cost = (distanceInKm * 0.18).toFixed(2);

      const quotationData = {
        ...formData,
        distance: distanceInKm,
        cost,
      };

      generatePDF(quotationData);

      alert(`Quotation generated successfully! Check your downloads folder.`);
    } catch (error) {
      console.error("Error:", error);
      alert("Error generating quotation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <Header userType="customer" />
      <div className="quotation-container">
        <form className="quotation-form" onSubmit={handleSubmit}>
          <div className="quotation-form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="quotation-input"
              value={formData.name}
              onChange={handleManualInput}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="quotation-form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="quotation-input"
              value={formData.email}
              onChange={handleManualInput}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="quotation-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="quotation-input"
              value={formData.phone}
              onChange={handleManualInput}
              placeholder="Enter your phone number"
              required
            />
            {errors.phone && <p className="error-text">{errors.phone}</p>}
          </div>
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
            {errors.movingLocations && <p className="error-text">{errors.movingLocations}</p>}
          </div>
          <div className="quotation-form-group">
            <label htmlFor="movingDate">Moving Date</label>
            <input
              type="date"
              id="movingDate"
              name="movingDate"
              className="quotation-input"
              value={formData.movingDate}
              onChange={handleManualInput}
              required
            />
            {errors.movingDate && <p className="error-text">{errors.movingDate}</p>}
          </div>
          <button type="submit" className="quotation-submit" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : "Generate Quotation"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default GetQuotation;