const crudRoutes = require("../utils/crudRoutes");
const Inventory = require("../models/inventoryModel");
module.exports = crudRoutes(Inventory);