// movemate_b/routes/Routes.js
const express = require('express');
const { register, login } = require('../controller/RegisterController');
const { addVehicle, getVehiclesByEmail } = require("../controller/VehicleController");
const { addAvailability, getAvailability, updateAvailability, deleteAvailability, searchMoversByDateAndLocation } = require("../controller/MoverAvailabilityController");
const { requestRide, updateRideStatus, getMoverRequests, getUserRequests } = require("../controller/RideRequestController");
const {  getMoverAppointments } = require("../controller/RideRequestController");

const multer = require("multer");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => { cb(null, "uploads/"); },
  filename: (req, file, cb) => { cb(null, Date.now() + "-" + file.originalname); }
});
const uploadMiddleware = multer({ storage });

router.post('/register', register);
router.post('/login', login);
router.post("/vehicle", uploadMiddleware.single("vehicle_image"), addVehicle);
router.get("/vehicleData/:email", getVehiclesByEmail);
router.post("/availability", addAvailability);
router.get("/availability/:moverId", getAvailability);
router.post("/availability/:id", updateAvailability);
router.delete("/availability/:id", deleteAvailability);
router.get('/searchMovers', searchMoversByDateAndLocation);

router.post('/rideRequest', requestRide);
router.post('/rideRequest/:id/status', updateRideStatus);
router.get('/moverRequests/:moverId', getMoverRequests);
router.get('/userRequests/:userId', getUserRequests);
// router.get('/userBookings/:userId', getUserBookings);
router.get('/moverAppointments/:moverId', getMoverAppointments);

module.exports = router;
