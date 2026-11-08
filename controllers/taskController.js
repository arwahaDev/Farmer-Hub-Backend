const Task = require("../models/taskModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Task);

module.exports = {
  getAllTasks: getAll,
  getTask: getOne,
  createTask: create,
  updateTask: update,
  deleteTask: remove,
};