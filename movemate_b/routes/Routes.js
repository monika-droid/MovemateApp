const express = require('express');
const { register, login } = require('../controller/RegisterController');
const { addVehicle, getVehiclesByEmail } = require("../controller/VehicleController");
const multer = require("multer");
const {addAvailability,getAvailability} = require("../controller/MoverAvailabilityController")
const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Create a multer instance for uploads
const uploadMiddleware = multer({ storage });

// Routes
router.post('/register', register);
router.post('/login', login);
router.post("/vehicle", uploadMiddleware.single("vehicle_image"), addVehicle);
router.get("/vehicleData/:email", getVehiclesByEmail);
router.post("/availability", addAvailability);
router.get("/availability", getAvailability);

module.exports = router;
