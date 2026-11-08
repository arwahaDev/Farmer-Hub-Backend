const Worker = require("../models/workerModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Worker);

module.exports = {
  getAllWorkers: getAll,
  getWorker: getOne,
  createWorker: create,
  updateWorker: update,
  deleteWorker: remove,
};