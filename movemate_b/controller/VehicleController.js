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
    console.error("Error saving vehicle:", error); // Improved error logging
    res.status(500).json({ error: "Failed to register vehicle" });
  }
};



const getVehiclesByEmail = async (req, res) => {
  console.log("Inside getVehiclesByEmail function");
  const { email } = req.params; // Assuming email is passed as a URL parameter

  try {
    const vehicles = await Vehicle.find({ mover_id: email });
    
    if (vehicles.length === 0) {
      return res.status(404).json({ message: "No vehicles found for this email." });
    }

    res.status(200).json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
};



module.exports = {
  addVehicle,getVehiclesByEmail
};
