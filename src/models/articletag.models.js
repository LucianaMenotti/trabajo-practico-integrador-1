import sequelize from "../config/database.js";
import {DataTypes} from "sequelize";

export const articleTagModels = sequelize.define(
    "ArticleTag",
    {
        article_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model:"articles", key:"id"},
        },
        tag_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model:"tags", key:"id"},
        },
    },
    {
        timestamps: true,
        underscored: true,
    },
);