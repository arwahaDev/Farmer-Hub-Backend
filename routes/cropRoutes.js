const express = require("express");

const {
  getAllCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Crops
router.get("/", protect, getAllCrops);

// Get Single Crop
router.get("/:id", protect, getCrop);

// Create Crop
router.post("/", protect, createCrop);

// Update Crop (Admin Only)
router.put("/:id", protect, authorize("admin"), updateCrop);

// Delete Crop (Admin Only)
router.delete("/:id", protect, authorize("admin"), deleteCrop);

module.exports = router;