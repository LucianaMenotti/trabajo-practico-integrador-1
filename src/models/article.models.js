import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { userModels } from "./user.models.js";

export const articleModels = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("published", "archived"),
      allowNull: false,
      defaultValue: "published",
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    paranoid: true,
  },
);

userModels.hasMany(articleModels, {
  foreignKey: "user_id",
  as: "articles",
  onDelete: "CASCADE",
});
articleModels.belongsTo(userModels, {
  foreignKey: "user_id",
  as: "author",
});
