import { userModels } from "./user.models.js";
import { profileModels } from "./profile.models.js";
import { articleModels } from "./article.models.js";
import { tagModels } from "./tag.models.js";
import { articleTagModels } from "./articletag.models.js";

//relacion entre User <-> Profile

userModels.hasOne(profileModels, {
    foreignKey: "user_id",
    as: "profile",
});

profileModels.belongsTo(userModels,{
    foreignKey: "user_id",
    as:"user",
});

//relacion entre user <-> article
userModels.hasMany(articleModels,{
    foreignKey: "user_id",
    as: "articles",
});

articleModels.belongsTo(userModels,{
    foreignKey:"user_id",
    as: "author",
});

//relacion entre article <-> tag
articleModels.belongsToMany(tagModels,{
    through: articleTagModels,
    foreignKey:"article_id",
    otherKey:"tag_id",
    as:"tags",
});

tagModels.belongsToMany(articleModels, {
    through: articleTagModels,
    foreignKey: "tag_id",
    otherKey:"article_id",
    as: "articles",
});

// eliminacion cascada
articleModels.hasMany(articleTagModels,{
    foreignKey:"article_id",
    onDelete:"CASCADE",
    hooks: true,
});