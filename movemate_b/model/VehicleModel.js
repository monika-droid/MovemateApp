const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  licence_number: { type: String, required: true },
  mover_id: { type: String, required: true },
  vehicle_type: { type: String, required: true },
  space_capacity: { type: Number, required: true },
  passenger_capacity: { type: Number, required: true },
  price_per_km: { type: Number, required: true },
  availability_status: { type: Boolean, required: true },
  vehicle_image: { type: String }, 
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
