import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 export const profileModels = sequelize.define(
  "profile",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: { model: "users", key: "id" },
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    biography: {
      type: DataTypes.TEXT,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
    birth_date: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    underscored: true,
  },
);
