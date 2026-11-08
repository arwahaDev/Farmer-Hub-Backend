const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM(
        "Irrigation",
        "Fertilizer",
        "Spraying",
        "Labour"
      ),
      allowNull: false,
    },

    cropId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("Pending", "Done", "Overdue"),
      defaultValue: "Pending",
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

module.exports = Task;