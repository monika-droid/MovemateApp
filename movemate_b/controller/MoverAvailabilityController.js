const MoverAvailability = require("../model/MoverAvailabilityModel");
const User = require("../model/UserModel");
const Vehicle = require("../model/VehicleModel");

const addAvailability = async (req, res) => {
  const { date, time, province, city, pricePerKm, moverId } = req.body;
  try {
    const mover = await User.findOne({ email: moverId });
    if (!mover) {
      return res.status(404).json({ message: "Mover not found" });
    }

    const vehicle = await Vehicle.findOne({ mover_id: moverId });
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    const newAvailability = new MoverAvailability({
      date,
      time,
      province,
      city,
      pricePerKm,
      moverId,
      name: mover.name,
      vehicleType: vehicle.vehicle_type,
      licenceNumber: vehicle.licence_number,
    });

    await newAvailability.save();
    res.status(201).json({ message: "Availability added successfully", data: newAvailability });
  } catch (error) {
    res.status(500).json({ error: "Failed to add availability" });
  }
};

const getAvailability = async (req, res) => {
  console.log(req.params)
  const { moverId } = req.params;
  try {
    const availabilities = await MoverAvailability.find({ moverId });
    res.status(200).json(availabilities);
    console.log(availabilities)
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve availability" });
  }
};

const updateAvailability = async (req, res) => {
  const { id } = req.params;
  const { date, time, province, city, pricePerKm } = req.body;
  try {
    const availability = await MoverAvailability.findByIdAndUpdate(
      id,
      { date, time, province, city, pricePerKm },
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

const searchMoversByDateAndLocation = async (req, res) => {
  const { date, location } = req.query;

  if (!date || !location) {
    return res.status(400).json({ message: "Date and location are required" });
  }

  try {
    const formattedDate = new Date(date);

    const movers = await MoverAvailability.aggregate([
      {
        $match: {
          date: formattedDate,
          city: location,
        },
      },
      {
        $lookup: {
          from: "vehicles",
          localField: "moverId",
          foreignField: "mover_id",
          as: "vehicleDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "moverId",
          foreignField: "email",
          as: "userDetails",
        },
      },
      { $unwind: "$vehicleDetails" },
      { $unwind: "$userDetails" },
      {
        $project: {
          name: "$userDetails.name",
          vehicleType: "$vehicleDetails.vehicle_type",
          licenceNumber: "$vehicleDetails.licence_number",
          date: "$date",
          time: "$time",
          location: "$city",
          price: "$pricePerKm",
          moverId: "$moverId",
          rideStatus: "$rideStatus",
        },
      },
    ]);

    res.status(200).json(movers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movers", error });
  }
};

const requestRide = async (req, res) => {
  const { availabilityId } = req.params;

  try {
    const availability = await MoverAvailability.findByIdAndUpdate(
      availabilityId,
      { rideStatus: "pending" },
      { new: true }
    );
    res.status(200).json({ message: "Ride request sent.", data: availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to request ride" });
  }
};

const approveRide = async (req, res) => {
  const { availabilityId } = req.params;

  try {
    const availability = await MoverAvailability.findByIdAndUpdate(
      availabilityId,
      { rideStatus: "approved" },
      { new: true }
    );
    res.status(200).json({ message: "Ride approved.", data: availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to approve ride" });
  }
};

const rejectRide = async (req, res) => {
  const { availabilityId } = req.params;

  try {
    const availability = await MoverAvailability.findByIdAndUpdate(
      availabilityId,
      { rideStatus: "rejected" },
      { new: true }
    );
    res.status(200).json({ message: "Ride rejected.", data: availability });
  } catch (error) {
    res.status(500).json({ error: "Failed to reject ride" });
  }
};

module.exports = {
  addAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
  searchMoversByDateAndLocation,
  requestRide,
  approveRide,
  rejectRide,
};
