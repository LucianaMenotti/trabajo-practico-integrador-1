import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

export const articleModels = sequelize.define(
    "Article",
    {
        title:{
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        content:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        excerpt:{
            type: DataTypes.STRING(500),

        },
        status:{
            type: DataTypes.ENUM("published", "archived"),
            defaultValue:"published",
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model:"users", key:"id"},

        }
    },
    {
        timestamps: true,
        underscored: true,
        paranoid: true,
    }
)