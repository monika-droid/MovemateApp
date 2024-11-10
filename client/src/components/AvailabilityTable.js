import React, { useEffect, useState } from "react";
import AvailabilityForm from "./AvailabilityForm";

const AvailabilityTable = ({ moverId }) => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [editingData, setEditingData] = useState(null); // Track the item being edited

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/availability/${moverId}`);
      if (response.ok) {
        const data = await response.json();
        setAvailabilityData(data);
      } else {
        alert("Failed to load availability data");
      }
    };

    fetchData();
  }, [moverId]);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/availability/${id}`, { method: "DELETE" });
    if (response.ok) {
      setAvailabilityData(availabilityData.filter((item) => item._id !== id));
    } else {
      alert("Failed to delete availability");
    }
  };

  const handleEdit = (availability) => {
    setEditingData(availability); // Set the item to be edited
  };

  const handleUpdate = async (updatedData) => {
    const response = await fetch(`/api/availability/${updatedData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      // Update the availabilityData state
      setAvailabilityData((prevData) =>
        prevData.map((item) => (item._id === updatedData._id ? updatedData : item))
      );
      setEditingData(null); // Close the edit form
    } else {
      alert("Failed to update availability");
    }
  };

  return (
    <div className="availability-table-container">
      <h2>My Availability</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Price per Km</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilityData.map((availability) => (
            <tr key={availability._id}>
              <td>{availability.day}</td>
              <td>{new Date(availability.date).toLocaleDateString()}</td>
              <td>{availability.time}</td>
              <td>{`${availability.location.city}, ${availability.location.province}`}</td>
              <td>{availability.pricePerKm}</td>
              <td>
                <button onClick={() => handleEdit(availability)}>Edit</button>
                <button onClick={() => handleDelete(availability._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render the AvailabilityForm for editing if editingData is set */}
      {editingData && (
        <AvailabilityForm
          onClose={() => setEditingData(null)}
          onSubmit={handleUpdate}
          moverId={moverId}
          initialData={editingData}
        />
      )}
    </div>
  );
};

export default AvailabilityTable;
