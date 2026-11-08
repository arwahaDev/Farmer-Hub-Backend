const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Worker = sequelize.define(
  "Worker",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    cnic: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
      },
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },

    dailyWage: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    joinDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    tableName: "workers",
    timestamps: true,
  }
);

module.exports = Worker;