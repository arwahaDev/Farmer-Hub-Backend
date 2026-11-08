const express = require("express");
const {
  getAllBuyers,
  getBuyer,
  createBuyer,
  updateBuyer,
  deleteBuyer,
} = require("../controllers/buyerController");
const { protect, authorize } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();
// Get All Buyers
router.get("/", protect, getAllBuyers);
// Get Single Buyer
router.get("/:id", protect, getBuyer);
// Create Buyer with Photo Upload
router.post(
  "/",
  protect,
  upload.single("photo"),
  createBuyer
);
// Update Buyer with Photo Upload (Admin Only)
router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("photo"),
  updateBuyer
);
// Delete Buyer (Admin Only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBuyer
);
module.exports = router;