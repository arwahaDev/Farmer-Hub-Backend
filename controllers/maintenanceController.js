const Maintenance = require("../models/maintenanceModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Maintenance);

module.exports = {
  getAllMaintenance: getAll,
  getMaintenance: getOne,
  createMaintenance: create,
  updateMaintenance: update,
  deleteMaintenance: remove,
};