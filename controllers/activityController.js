const Activity = require("../models/activityModel");
const { ok } = require("../utils/response");

// Get All Activities
const getAllActivities = async (req, res, next) => {
  try {
    const activities = await Activity.findAll({
      order: [["timestamp", "DESC"]],
    });

    return ok(
      res,
      "Activity records fetched successfully.",
      activities
    );
  } catch (error) {
    next(error);
  }
};

// Get Single Activity
const getActivity = async (req, res, next) => {
  try {
    const activity = await Activity.findByPk(req.params.id);

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity record not found.",
        data: null,
      });
    }

    return ok(
      res,
      "Activity record fetched successfully.",
      activity
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllActivities,
  getActivity,
};