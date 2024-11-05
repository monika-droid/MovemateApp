const express = require('express');
const { register, login } = require('../controller/RegisterController');
const { addVehicle } = require("../controller/VehicleController");
const { addAvailability, getAvailability, updateAvailability, deleteAvailability } = require("../controller/MoverAvailabilityController");
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
router.post("/add", uploadMiddleware.single("vehicle_image"), addVehicle);

router.post("/availability", addAvailability);
router.get("/availability/:moverId", getAvailability);
router.put("/availability/:id", updateAvailability);
router.delete("/availability/:id", deleteAvailability);

module.exports = router;
