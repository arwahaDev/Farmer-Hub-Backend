const Inventory = require("../models/inventoryModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Inventory);

module.exports = {
  getAllInventory: getAll,
  getInventory: getOne,
  createInventory: create,
  updateInventory: update,
  deleteInventory: remove,
};