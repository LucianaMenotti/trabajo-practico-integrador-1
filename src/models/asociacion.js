import { userModels } from "./user.models.js";
import { profileModels } from "./profile.models.js";
import { articleModels } from "./article.models.js";
import { tagModels } from "./tag.models.js";
import { articleTagModels } from "./articletag.models.js";

userModels.hasOne(profileModels, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});
profileModels.belongsTo(userModels, {
  foreignKey: "user_id",
  as: "user",
});

userModels.hasMany(articleModels, {
  foreignKey: "user_id",
  as: "articles",
  onDelete: "CASCADE",
});
articleModels.belongsTo(userModels, {
  foreignKey: "user_id",
  as: "author",
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
