const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    cropId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },

    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Pending", "Delivered", "Cancelled"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;