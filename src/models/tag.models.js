import sequelize from "../config/database.js";
import {DataTypes} from "sequelize";

export const tagModels = sequelize.define(
    "Tag",
    {
        name:{
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        underscored: true,
    }
);