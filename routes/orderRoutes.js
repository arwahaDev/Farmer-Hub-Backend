const express = require("express");
const {
  getAllOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const crudRoutes = require("../utils/crudRoutes");
const router = crudRoutes(require("../models/orderModel"));
module.exports = router;