// movemate_b/model/RideRequestModel.js
const mongoose = require('mongoose');

const RideRequestSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  moverId: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'denied'], default: 'pending' }
});

module.exports = mongoose.model('RideRequest', RideRequestSchema);
