const Crop = require("../models/cropModel");
const { ok, fail } = require("../utils/response");

// Get All Crops
const getAllCrops = async (req, res, next) => {
  try {
    const crops = await Crop.findAll();

    return ok(res, "Crops fetched successfully.", crops);
  } catch (error) {
    next(error);
  }
};

// Get Single Crop
const getCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findByPk(req.params.id);

    if (!crop) {
      return fail(res, "Crop not found.", 404);
    }

    return ok(res, "Crop fetched successfully.", crop);
  } catch (error) {
    next(error);
  }
};

// Create Crop
const createCrop = async (req, res, next) => {
  try {
    const {
      name,
      field,
      plantingDate,
      cuttingDate,
      healthScore,
      status,
      expectedQty,
      harvestQty,
    } = req.body;

    if (!name || !field || !cuttingDate) {
      return fail(res, "Name, field and cutting date are required.", 400);
    }

    const crop = await Crop.create({
      name,
      field,
      plantingDate,
      cuttingDate,
      healthScore,
      status,
      expectedQty,
      harvestQty,
      createdBy: req.user.id,
    });

    return ok(res, "Crop created successfully.", crop, 201);
  } catch (error) {
    next(error);
  }
};

// Update Crop
const updateCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findByPk(req.params.id);

    if (!crop) {
      return fail(res, "Crop not found.", 404);
    }

    await crop.update(req.body);

    return ok(res, "Crop updated successfully.", crop);
  } catch (error) {
    next(error);
  }
};

// Delete Crop
const deleteCrop = async (req, res, next) => {
  try {
    const crop = await Crop.findByPk(req.params.id);

    if (!crop) {
      return fail(res, "Crop not found.", 404);
    }

    await crop.destroy();

    return ok(res, "Crop deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCrops,
  getCrop,
  createCrop,
  updateCrop,
  deleteCrop,
};