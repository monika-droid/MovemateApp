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
  const { email } = req.params; 

  try {
    const vehicles = await Vehicle.find({ mover_id: email });

    if (!vehicles.length) {
      return res.status(200).json({ data: null, message: "No vehicles found for this email." });
    }

    const vehicleData = vehicles.map(vehicle => ({
      licence_number: vehicle.licence_number,
      mover_id: vehicle.mover_id,
      vehicle_type: vehicle.vehicle_type,
      space_capacity: vehicle.space_capacity,
      passenger_capacity: vehicle.passenger_capacity,
      price_per_km: vehicle.price_per_km,
      availability_status: vehicle.availability_status,
      vehicle_image: vehicle.vehicle_image,
    }));
    const licence_number = vehicles[0].licence_number;

    res.status(200).json({ data: licence_number, message: "Vehicles retrieved successfully." });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    res.status(500).json({ error: "Failed to fetch vehicles." });
  }
};




module.exports = {
  addVehicle,getVehiclesByEmail
};
