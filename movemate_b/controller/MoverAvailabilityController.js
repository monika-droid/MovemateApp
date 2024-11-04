const MoverAvailability = require("../model/MoverAvailabilityModel");

// Add Availability
const addAvailability = async (req, res) => {
  const { mover_id, province, city, date } = req.body;

  try {
    const newAvailability = new MoverAvailability({
      mover_id,
      province,
      city,
      date
    });

    await newAvailability.save();
    res.status(201).json({ message: "Availability added successfully", data: newAvailability });
  } catch (error) {
    res.status(500).json({ error: "Failed to add availability" });
  }
};

// Fetch Availability
const getAvailability = async (req, res) => {
  try {
    const availabilities = await MoverAvailability.find();
    res.status(200).json({ data: availabilities });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch availability" });
  }
};

module.exports = {
  addAvailability,
  getAvailability
};
