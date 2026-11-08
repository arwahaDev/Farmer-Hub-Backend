const Equipment = require("../models/equipmentModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Equipment);

module.exports = {
  getAllEquipment: getAll,
  getEquipment: getOne,
  createEquipment: create,
  updateEquipment: update,
  deleteEquipment: remove,
};