const crudRoutes = require("../utils/crudRoutes");
const Worker = require("../models/workerModel");

module.exports = crudRoutes(Worker);