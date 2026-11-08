const crudRoutes = require("../utils/crudRoutes");
const Expense = require("../models/expenseModel");
module.exports = crudRoutes(Expense);