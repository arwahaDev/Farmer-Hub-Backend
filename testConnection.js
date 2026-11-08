const sequelize = require("./config/db");

const testConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  } finally {
    await sequelize.close();
  }
};

testConnection();