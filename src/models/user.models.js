import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export const userModels = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
      validate: { len: [3, 20] },
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    timestamps: true,
    underscored: true,
    paranoid: true,
  },
);
