const mongoose = require('mongoose');

const MoverDataSchema = new mongoose.Schema({
  day: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  pricePerKm: { type: Number, required: true },
});

module.exports = mongoose.model('MoverData', MoverDataSchema);
