const RideRequest = require('../model/RideRequestModel');
const User = require('../model/UserModel');
const MoverAvailability = require('../model/MoverAvailabilityModel');

const requestRide = async (req, res) => {
  const { userId, moverId, date, time, location } = req.body;
  console.log("Request data received:", req.body);

  try {
    const newRequest = new RideRequest({
      userId,
      moverId,
      date,
      time,
      location,
      status: 'pending'
    });
    await newRequest.save();
    res.status(201).json({ message: 'Ride request sent', request: newRequest });
  } catch (error) {
    console.error("Failed to send ride request:", error);
    res.status(500).json({ error: 'Failed to send ride request' });
  }
};

const updateRideStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const rideRequest = await RideRequest.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json({ message: 'Ride status updated', request: rideRequest });
  } catch (error) {
    console.error("Failed to update ride status:", error);
    res.status(500).json({ error: 'Failed to update ride status' });
  }
};

const getMoverRequests = async (req, res) => {
  const { moverId } = req.params;

  try {
    const requests = await RideRequest.find({ moverId, status: 'pending' });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Failed to fetch ride requests:", error);
    res.status(500).json({ error: 'Failed to fetch ride requests' });
  }
};

const getUserRequests = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await RideRequest.find({ userId });
    res.status(200).json(requests);
  } catch (error) {
    console.error("Failed to fetch user ride requests:", error);
    res.status(500).json({ error: 'Failed to fetch user ride requests' });
  }
};

const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const bookings = await RideRequest.find({ userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user bookings' });
  }
};

const getMoverAppointments = async (req, res) => {
  const { moverId } = req.params;

  try {
    const appointments = await RideRequest.find({ moverId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch mover appointments' });
  }
};

module.exports = {
  requestRide,
  updateRideStatus,
  getMoverRequests,
  getUserRequests,
  getUserBookings,
  getMoverAppointments
};
