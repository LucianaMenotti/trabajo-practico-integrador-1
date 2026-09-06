import sequelize from "../config/database.js";
import {DataTypes} from "sequelize";

export const articleTagModels = sequelize.define(
    "ArticleTag",
    {
        article_id:{
            
        },
        tag_id:{

        },
    },
    {
        timestamps: true,
        underscored: true,
    }
)