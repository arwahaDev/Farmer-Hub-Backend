const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Activity = sequelize.define(
  "Activity",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    user: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },

    action: {
      type: DataTypes.ENUM("add", "edit", "delete"),
      allowNull: false,
    },

    entity: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    entityId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "activities",
    timestamps: false,
  }
);

module.exports = Activity;