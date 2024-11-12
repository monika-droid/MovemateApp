const mongoose = require('mongoose');

const MoverDataSchema = new mongoose.Schema({
  moverId: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  pricePerKm: { type: Number, required: true },
  name: { type: String },
  vehicleType: { type: String },
  licenceNumber: { type: String },
  rideStatus: { type: String, enum: ["pending", "approved", "rejected"], default: null }
});

module.exports = mongoose.model('MoverData', MoverDataSchema);