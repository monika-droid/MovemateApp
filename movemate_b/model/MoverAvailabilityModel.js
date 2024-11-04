const mongoose = require("mongoose");

const moverAvailabilitySchema = new mongoose.Schema({
  mover_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  province: { type: String, required: true },
  city: { type: String, required: true },
  date: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("MoverAvailability", moverAvailabilitySchema);
