require("dotenv").config();

const sequelize = require("./config/db");
const {
  User,
  Crop,
  Inventory,
} = require("./models/associations");

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();

    console.log("Database connected successfully!");

    await sequelize.sync();

    // Create Demo Admin
    let admin = await User.findOne({
      where: { email: "admin@agrifarm.com" },
    });

    if (!admin) {
      admin = await User.create({
        fullName: "Demo Admin",
        username: "admin",
        email: "admin@agrifarm.com",
        password: "AdminDemo2026!",
        role: "admin",
      });
    }

    // Create Demo Manager
    let manager = await User.findOne({
      where: { email: "manager@agrifarm.com" },
    });

    if (!manager) {
      manager = await User.create({
        fullName: "Demo Manager",
        username: "manager",
        email: "manager@agrifarm.com",
        password: "ManagerDemo2026!",
        role: "manager",
      });
    }

    // Create Sample Crop
    let crop = await Crop.findOne({
      where: { name: "Wheat", field: "Field A" },
    });

    if (!crop) {
      crop = await Crop.create({
        name: "Wheat",
        field: "Field A",
        plantingDate: "2026-10-01",
        cuttingDate: "2027-03-01",
        healthScore: 85,
        status: "Healthy",
        expectedQty: 1000,
        harvestQty: 0,
        createdBy: admin.id,
      });
    }

    // Create Sample Inventory
    const inventoryItem = await Inventory.findOne({
      where: { item: "Urea Fertilizer" },
    });

    if (!inventoryItem) {
      await Inventory.create({
        item: "Urea Fertilizer",
        type: "Fertilizer",
        qty: 100,
        minQty: 20,
        unit: "kg",
      });
    }

    console.log("Demo Admin created or already exists.");
    console.log("Demo Manager created or already exists.");
    console.log("Sample Crop created or already exists.");
    console.log("Sample Inventory created or already exists.");
    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();