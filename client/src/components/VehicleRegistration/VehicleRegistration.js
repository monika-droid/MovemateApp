// src/components/VehicleRegistrationForm.js
import React, { useState } from "react";
import apiService from "../../Services/Services";

const VehicleRegistrationForm = () => {
  const [vehicle, setVehicle] = useState({
    licence_number: "",
    mover_id: "",
    vehicle_type: "",
    space_capacity: "",
    passenger_capacity: "",
    price_per_km: "",
    availability_status: false,
  });
  const [vehicleImage, setVehicleImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVehicle({
      ...vehicle,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setVehicleImage(file);
    setImagePreview(URL.createObjectURL(file)); // Preview the selected image
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!vehicle.licence_number.trim()) newErrors.licence_number = "Licence Number is required.";
    if (!vehicle.mover_id.trim()) newErrors.mover_id = "Mover ID is required.";
    if (!vehicle.vehicle_type.trim()) newErrors.vehicle_type = "Vehicle Type is required.";
    if (!vehicle.space_capacity || vehicle.space_capacity <= 0) newErrors.space_capacity = "Space Capacity must be a positive number.";
    if (!vehicle.passenger_capacity || vehicle.passenger_capacity <= 0) newErrors.passenger_capacity = "Passenger Capacity must be a positive number.";
    if (!vehicle.price_per_km || vehicle.price_per_km <= 0) newErrors.price_per_km = "Price per KM must be a positive number.";
    if (!vehicleImage) newErrors.vehicle_image = "Vehicle image is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSuccess("");
    const formData = new FormData();
    Object.keys(vehicle).forEach((key) => {
      formData.append(key, vehicle[key]);
    });
    formData.append("vehicle_image", vehicleImage);

    try {
      await apiService.postFormData("/add", formData);
      setSuccess("Vehicle registered successfully!");

      // Reset form fields
      setVehicle({
        licence_number: "",
        mover_id: "",
        vehicle_type: "",
        space_capacity: "",
        passenger_capacity: "",
        price_per_km: "",
        availability_status: false,
      });
      setVehicleImage(null);
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error("Error registering vehicle:", error);
      setErrors({ submit: error.message });
    }
  };

  return (
    <div>
      <h2>Vehicle Registration</h2>
      <form onSubmit={handleSubmit}>
        {/* Licence Number Input */}
        <div>
          <label>Licence Number</label>
          <input
            type="text"
            name="licence_number"
            value={vehicle.licence_number}
            onChange={handleChange}
            required
          />
          {errors.licence_number && <p style={{ color: "red" }}>{errors.licence_number}</p>}
        </div>

        {/* Mover ID Input */}
        <div>
          <label>Mover ID</label>
          <input
            type="text"
            name="mover_id"
            value={vehicle.mover_id}
            onChange={handleChange}
            required
          />
          {errors.mover_id && <p style={{ color: "red" }}>{errors.mover_id}</p>}
        </div>

        {/* Vehicle Type Input */}
        <div>
          <label>Vehicle Type</label>
          <input
            type="text"
            name="vehicle_type"
            value={vehicle.vehicle_type}
            onChange={handleChange}
            required
          />
          {errors.vehicle_type && <p style={{ color: "red" }}>{errors.vehicle_type}</p>}
        </div>

        {/* Space Capacity Input */}
        <div>
          <label>Space Capacity</label>
          <input
            type="number"
            name="space_capacity"
            value={vehicle.space_capacity}
            onChange={handleChange}
            required
          />
          {errors.space_capacity && <p style={{ color: "red" }}>{errors.space_capacity}</p>}
        </div>

        {/* Passenger Capacity Input */}
        <div>
          <label>Passenger Capacity</label>
          <input
            type="number"
            name="passenger_capacity"
            value={vehicle.passenger_capacity}
            onChange={handleChange}
            required
          />
          {errors.passenger_capacity && <p style={{ color: "red" }}>{errors.passenger_capacity}</p>}
        </div>

        {/* Price per KM Input */}
        <div>
          <label>Price per KM</label>
          <input
            type="number"
            name="price_per_km"
            value={vehicle.price_per_km}
            onChange={handleChange}
            required
          />
          {errors.price_per_km && <p style={{ color: "red" }}>{errors.price_per_km}</p>}
        </div>

        {/* Vehicle Image Input */}
        <div>
          <label>Vehicle Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} required />
          {errors.vehicle_image && <p style={{ color: "red" }}>{errors.vehicle_image}</p>}
          {imagePreview && <img src={imagePreview} alt="Vehicle Preview" style={{ maxWidth: "20%", marginTop: "10px" }} />}
        </div>

        {errors.submit && <p style={{ color: "red" }}>{errors.submit}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <button type="submit">Register Vehicle</button>
      </form>
    </div>
  );
};

export default VehicleRegistrationForm;
