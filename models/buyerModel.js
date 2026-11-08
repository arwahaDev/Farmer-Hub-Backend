const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Buyer = sequelize.define(
  "Buyer",
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

    cnic: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/,
      },
    },

    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    cropId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    quantity: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "buyers",
    timestamps: true,
  }
);

module.exports = Buyer;