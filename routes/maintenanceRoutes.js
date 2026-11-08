const crudRoutes = require("../utils/crudRoutes");
const Maintenance = require("../models/maintenanceModel");

module.exports = crudRoutes(Maintenance);