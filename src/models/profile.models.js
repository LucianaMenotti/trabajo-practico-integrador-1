import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { userModels } from "./user.models.js";

export const profileModels = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
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
    allowNull: true,
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  birth_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

userModels.hasOne(profileModels, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
profileModels.belongsTo(userModels, {
  foreignKey: "user_id",
  as: "user",
});
