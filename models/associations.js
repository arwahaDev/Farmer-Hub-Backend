const User = require("./userModel");
const Crop = require("./cropModel");
const Order = require("./orderModel");
const Buyer = require("./buyerModel");
const Task = require("./taskModel");
const Expense = require("./expenseModel");
const Inventory = require("./inventoryModel");
const Worker = require("./workerModel");
const Attendance = require("./attendanceModel");
const Equipment = require("./equipmentModal");
const Maintenance = require("./maintenanceModel");
const Activity = require("./activityModel");

// User and Crop
User.hasMany(Crop, { foreignKey: "createdBy", as: "createdCrops" });
Crop.belongsTo(User, { foreignKey: "createdBy", as: "creator" });

// Crop and Order
Crop.hasMany(Order, { foreignKey: "cropId" });
Order.belongsTo(Crop, { foreignKey: "cropId" });

// Crop and Buyer
Crop.hasMany(Buyer, { foreignKey: "cropId" });
Buyer.belongsTo(Crop, { foreignKey: "cropId" });

// Crop and Task
Crop.hasMany(Task, { foreignKey: "cropId" });
Task.belongsTo(Crop, { foreignKey: "cropId" });

// Crop and Expense
Crop.hasMany(Expense, { foreignKey: "cropId" });
Expense.belongsTo(Crop, { foreignKey: "cropId" });

// Worker and Attendance
Worker.hasMany(Attendance, { foreignKey: "workerId" });
Attendance.belongsTo(Worker, { foreignKey: "workerId" });

// Equipment and Maintenance
Equipment.hasMany(Maintenance, { foreignKey: "equipmentId" });
Maintenance.belongsTo(Equipment, { foreignKey: "equipmentId" });

module.exports = {
  User,
  Crop,
  Order,
  Buyer,
  Task,
  Expense,
  Inventory,
  Worker,
  Attendance,
  Equipment,
  Maintenance,
  Activity,
};