const Expense = require("../models/expenseModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Expense);

module.exports = {
  getAllExpenses: getAll,
  getExpense: getOne,
  createExpense: create,
  updateExpense: update,
  deleteExpense: remove,
};