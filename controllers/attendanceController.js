const Attendance = require("../models/attendanceModel");
const crudFactory = require("../utils/crudFactory");

const {
  getAll,
  getOne,
  create,
  update,
  remove,
} = crudFactory(Attendance);

module.exports = {
  getAllAttendance: getAll,
  getAttendance: getOne,
  createAttendance: create,
  updateAttendance: update,
  deleteAttendance: remove,
};