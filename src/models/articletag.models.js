import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import { articleModels } from "./article.models.js";
import { tagModels } from "./tag.models.js";

export const articleTagModels = sequelize.define("ArticleTag", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

articleModels.belongsToMany(tagModels, {
  through: articleTagModels,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE",
});
tagModels.belongsToMany(articleModels, {
  through: articleTagModels,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
  onDelete: "CASCADE",
});
