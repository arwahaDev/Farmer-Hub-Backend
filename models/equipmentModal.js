const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Equipment = sequelize.define(
  "Equipment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },

    purchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Active", "Under Repair", "Idle"),
      defaultValue: "Active",
    },

    lastServiceDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    serviceIntervalDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "equipment",
    timestamps: true,
  }
);

module.exports = Equipment;