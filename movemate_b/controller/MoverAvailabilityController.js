const MoverAvailability = require("../model/MoverAvailabilityModel");

const addAvailability = async (req, res) => {
  const { day, date, time, province, city, pricePerKm } = req.body;

  try {
    const newAvailability = new MoverData({
      day,
      date,
      time,
      province,
      city,
      pricePerKm,
    });


    await availability.save();
    res.status(201).json({ message: "Availability added successfully", data: availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to add availability" });
  }
};

const getAvailability = async (req, res) => {
  const { moverId } = req.params;

  try {
    const availabilities = await MoverAvailability.find({ moverId });
    res.status(200).json(availabilities);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve availability" });
  }
};

const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { day, date, time, province, city, pricePerKm } = req.body;

  try {
    const availability = await MoverAvailability.findByIdAndUpdate(
      id,
      { day, date, time, province, city, pricePerKm },
      { new: true }
    );
    res.status(200).json({ message: "Availability updated successfully", data: availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to update availability" });
  }
};

const deleteAvailability = async (req, res) => {
  const { id } = req.params;

  try {
    await MoverAvailability.findByIdAndDelete(id);
    res.status(200).json({ message: "Availability deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete availability" });
  }
};

module.exports = {
  addAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability
};
