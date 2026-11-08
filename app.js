const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config();

// Import Database and Models
const sequelize = require("./config/db");
require("./models/associations");

// Import Middleware
const {
  notFound,
  errorHandler,
} = require("./middleware/errorMiddleware");

// Create Express App
const app = express();

// Global Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve Uploaded Images
app.use(
  "/images",
  express.static(path.join(__dirname, "public/Images"))
);

// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Agriculture Management System API is running!",
  });
});

// Import Routes
const userRoutes = require("./routes/userRoutes");
const cropRoutes = require("./routes/cropRoutes");
const orderRoutes = require("./routes/orderRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const workerRoutes = require("./routes/workerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const activityRoutes = require("./routes/activityRoutes");
// Register Routes
app.use("/api/users", userRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/buyer", buyerRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/worker", workerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/activities", activityRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server After Database Connection
const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully!");

    await sequelize.sync();

    console.log("Database models synchronized!");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;