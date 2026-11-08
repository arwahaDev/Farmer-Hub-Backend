const express = require("express");

const {
  signup,
  login,
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

// Public Routes
router.post("/signup", signup);
router.post("/login", login);

// Protected Routes
router.get("/profile", protect, getProfile);

// Admin Only Routes
router.get("/", protect, authorize("admin"), getAllUsers);
router.put("/:id", protect, authorize("admin"), updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = router;