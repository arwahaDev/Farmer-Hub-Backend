const crudRoutes = require("../utils/crudRoutes");
const Task = require("../models/taskModel");
module.exports = crudRoutes(Task);