const express = require("express");

const {
  getAllActivities,
  getActivity,
} = require("../controllers/activityController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Get All Activities (Admin Only)
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllActivities
);

// Get Single Activity (Admin Only)
router.get(
  "/:id",
  protect,
  authorize("admin"),
  getActivity
);

module.exports = router;