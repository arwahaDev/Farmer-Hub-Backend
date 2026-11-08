const crudRoutes = require("../utils/crudRoutes");
const Attendance = require("../models/attendanceModel");

module.exports = crudRoutes(Attendance);