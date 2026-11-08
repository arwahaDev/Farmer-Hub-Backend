const Order = require("../models/orderModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Order);

module.exports = {
  getAllOrders: getAll,
  getOrder: getOne,
  createOrder: create,
  updateOrder: update,
  deleteOrder: remove,
};