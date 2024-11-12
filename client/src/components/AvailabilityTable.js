import React, { useEffect, useState } from "react";
import AvailabilityForm from "./AvailabilityForm";

const AvailabilityTable = ({ moverId }) => {
  const [availabilityData, setAvailabilityData] = useState([]);
  const [editingData, setEditingData] = useState(null);

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
    setEditingData(availability);
  };

  const handleUpdate = async (updatedData) => {
    const response = await fetch(`/api/availability/${updatedData._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    if (response.ok) {
      setAvailabilityData((prevData) =>
        prevData.map((item) => (item._id === updatedData._id ? updatedData : item))
      );
      setEditingData(null);
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
            <th>Date</th>
            <th>Time</th>
            <th>Province</th>
            <th>City</th>
            <th>Price per Km</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilityData.map((availability) => (
            <tr key={availability._id}>
              <td>{new Date(availability.date).toLocaleDateString()}</td>
              <td>{availability.time}</td>
              <td>{`${availability.city}, ${availability.province}`}</td>
              <td>{availability.pricePerKm}</td>
              <td>
                <button onClick={() => handleEdit(availability)}>Edit</button>
                <button onClick={() => handleDelete(availability._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
