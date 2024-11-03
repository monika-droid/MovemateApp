const express = require('express');
const { register, login } = require('../controller/RegisterController');
const { addVehicle, getVehiclesByEmail } = require("../controller/VehicleController");
const multer = require("multer");

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
router.get("/test", (req, res) => {
  res.send("Test route is working");
});
router.get("/vehicleData/:email", getVehiclesByEmail);
module.exports = router;
