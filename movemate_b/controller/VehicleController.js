// controller/VehicleController.js
const Vehicle = require("../model/VehicleModel");

const addVehicle = async (req, res) => {
  const {
    licence_number,
    mover_id,
    vehicle_type,
    space_capacity,
    passenger_capacity,
    price_per_km,
    availability_status,
  } = req.body;

  try {
    const newVehicle = new Vehicle({
      licence_number,
      mover_id,
      vehicle_type,
      space_capacity,
      passenger_capacity,
      price_per_km,
      availability_status,
      vehicle_image: req.file ? req.file.path : null, 
    });

    await newVehicle.save();
    res.status(201).json({ message: "Vehicle registered successfully", data: newVehicle });
  } catch (error) {
    res.status(500).json({ error: "Failed to register vehicle" });
  }
};

module.exports = {
  addVehicle,
};
