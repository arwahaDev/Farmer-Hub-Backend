const Buyer = require("../models/buyerModel");
const Crop = require("../models/cropModel");
const { ok, fail } = require("../utils/response");

// Get All Buyers
const getAllBuyers = async (req, res, next) => {
  try {
    const buyers = await Buyer.findAll({
      include: [{ model: Crop }],
    });

    return ok(res, "Buyers fetched successfully.", buyers);
  } catch (error) {
    next(error);
  }
};

// Get Single Buyer
const getBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findByPk(req.params.id, {
      include: [{ model: Crop }],
    });

    if (!buyer) {
      return fail(res, "Buyer not found.", 404);
    }

    return ok(res, "Buyer fetched successfully.", buyer);
  } catch (error) {
    next(error);
  }
};

// Create Buyer
const createBuyer = async (req, res, next) => {
  try {
    const { name, cnic, cropId, quantity, date } = req.body;

    if (!name || !cnic || !date) {
      return fail(res, "Name, CNIC and date are required.", 400);
    }

    const existingBuyer = await Buyer.findOne({ where: { cnic } });

    if (existingBuyer) {
      return fail(res, "This CNIC already exists.", 409);
    }

    if (cropId) {
      const crop = await Crop.findByPk(cropId);

      if (!crop) {
        return fail(res, "Selected crop not found.", 404);
      }

      const availableStock = Number(crop.harvestQty);

      if (Number(quantity) > availableStock) {
        return fail(res, "Insufficient crop stock.", 400);
      }

      await crop.update({
        harvestQty: availableStock - Number(quantity),
      });
    }

    const buyer = await Buyer.create({
      name,
      cnic,
      photoUrl: req.file ? `/images/${req.file.filename}` : null,
      cropId: cropId || null,
      quantity: quantity || 0,
      date,
    });

    return ok(res, "Buyer created successfully.", buyer, 201);
  } catch (error) {
    next(error);
  }
};

// Update Buyer
const updateBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findByPk(req.params.id);

    if (!buyer) {
      return fail(res, "Buyer not found.", 404);
    }

    const { name, cnic, cropId, quantity, date } = req.body;

    if (cnic && cnic !== buyer.cnic) {
      const existingBuyer = await Buyer.findOne({ where: { cnic } });

      if (existingBuyer) {
        return fail(res, "This CNIC already exists.", 409);
      }
    }

    await buyer.update({
      ...(name !== undefined && { name }),
      ...(cnic !== undefined && { cnic }),
      ...(cropId !== undefined && { cropId }),
      ...(quantity !== undefined && { quantity }),
      ...(date !== undefined && { date }),
      ...(req.file && {
        photoUrl: `/images/${req.file.filename}`,
      }),
    });

    return ok(res, "Buyer updated successfully.", buyer);
  } catch (error) {
    next(error);
  }
};

// Delete Buyer
const deleteBuyer = async (req, res, next) => {
  try {
    const buyer = await Buyer.findByPk(req.params.id);

    if (!buyer) {
      return fail(res, "Buyer not found.", 404);
    }

    await buyer.destroy();

    return ok(res, "Buyer deleted successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBuyers,
  getBuyer,
  createBuyer,
  updateBuyer,
  deleteBuyer,
};